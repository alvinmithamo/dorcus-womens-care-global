import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { connectDB, initDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const PESASWAP_API_URL = process.env.PESASWAP_API_URL || 'https://api.sandbox.pesaswap.io';
const GHL_API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';

const packages = {
  menopause_hormonal: {
    id: 'menopause_hormonal',
    name: 'Menopause and other Hormonal conditions',
    amount: Number(process.env.MENOPAUSE_HORMONAL_PRICE || 8000),
    currency: 'KES',
    durationMinutes: 45,
  },
  fertility_consultation: {
    id: 'fertility_consultation',
    name: 'Fertility Consultation',
    amount: Number(process.env.FERTILITY_CONSULTATION_PRICE || 8000),
    currency: 'KES',
    durationMinutes: 45,
  },
  doc_in_pocket: {
    id: 'doc_in_pocket',
    name: 'Doc-in-pocket',
    amount: Number(process.env.DOC_IN_POCKET_PRICE || 3000),
    currency: 'KES',
    durationMinutes: 30,
  },
};

const updateBooking = async (bookingId, updates) => {
  const db = await connectDB();
  
  const fields = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    // Convert camelCase to snake_case for PostgreSQL
    const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    fields.push(`${dbField} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  }

  values.push(bookingId);
  values.push(bookingId);

  const query = `
    UPDATE bookings 
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
    WHERE booking_id = $${paramIndex} OR payment_id = $${paramIndex + 1}
    RETURNING *
  `;

  try {
    const result = await db.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating booking:', error.message);
    throw error;
  }
};

const createBooking = async (bookingData) => {
  const db = await connectDB();

  const fields = [];
  const placeholders = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(bookingData)) {
    const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    fields.push(dbField);
    placeholders.push(`$${paramIndex}`);
    values.push(value);
    paramIndex++;
  }

  const query = `
    INSERT INTO bookings (${fields.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating booking:', error.message);
    throw error;
  }
};

const getBooking = async (bookingId) => {
  const db = await connectDB();

  const query = `
    SELECT * FROM bookings 
    WHERE booking_id = $1
  `;

  try {
    const result = await db.query(query, [bookingId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching booking:', error.message);
    throw error;
  }
};

const createLeadConnectorAppointment = async (booking) => {
  if (!process.env.GHL_API_KEY || !process.env.GHL_CALENDAR_ID || !process.env.GHL_LOCATION_ID) {
    throw new Error('Missing GHL_API_KEY, GHL_CALENDAR_ID, or GHL_LOCATION_ID');
  }

  const startTime = new Date(`${booking.date}T${booking.time}`).toISOString();
  const endTime = new Date(new Date(startTime).getTime() + booking.durationMinutes * 60 * 1000).toISOString();

  const response = await axios.post(
    `${GHL_API_URL}/calendars/events/appointments`,
    {
      calendarId: process.env.GHL_CALENDAR_ID,
      locationId: process.env.GHL_LOCATION_ID,
      contactId: booking.contactId || undefined,
      title: booking.packageName,
      startTime,
      endTime,
      appointmentStatus: 'confirmed',
      assignedUserId: process.env.GHL_ASSIGNED_USER_ID || undefined,
      address: booking.location || undefined,
      notes: `Paid via PesaSwap. Payment ID: ${booking.paymentId}. Client: ${booking.name || booking.email}. Phone: ${booking.phone || 'N/A'}`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        Version: process.env.GHL_API_VERSION || '2021-07-28',
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

const extractPaymentEvent = (event) => {
  const payment = event.data?.object || event.data || event.payment || event;
  return {
    type: event.type || event.event || payment.status,
    paymentId: payment.id || payment.paymentId || payment.payment_id || payment.reference,
    status: payment.status,
    metadata: payment.metadata || {},
    raw: event,
  };
};

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/packages', (req, res) => {
  res.json(Object.values(packages));
});

// Add a root route for Railway health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Dorcus Womens Care API is running' });
});

app.post('/api/create-payment', async (req, res) => {
  try {
    const { packageId, email, phone, name, date, time, contactId, location, metadata } = req.body;
    const selectedPackage = packages[packageId];

    if (!selectedPackage || !email || !date || !time) {
      return res.status(400).json({
        error: 'Missing required fields: packageId, email, date, time'
      });
    }

    const bookingId = crypto.randomUUID();
    const paymentData = {
      amount: Math.round(selectedPackage.amount * 100),
      currency: selectedPackage.currency,
      customer: {
        email: email,
        name: name || '',
        phone: phone || '',
      },
      metadata: {
        ...(metadata || {}),
        bookingId,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        date,
        time,
      },
      confirm: true,
      capture_method: 'automatic',
      return_url: `${process.env.CORS_ORIGIN}/payment/success?bookingId=${bookingId}`,
      cancel_url: `${process.env.CORS_ORIGIN}/payment/failure?bookingId=${bookingId}`,
    };

    const response = await axios.post(
      `${PESASWAP_API_URL}/payments`,
      paymentData,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.PESASWAP_API_KEY,
        },
      }
    );

    const paymentId = response.data.id || response.data.paymentId || response.data.payment_id;
    
    const booking = await createBooking({
      bookingId,
      paymentId,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      amount: selectedPackage.amount,
      currency: selectedPackage.currency,
      durationMinutes: selectedPackage.durationMinutes,
      email,
      phone: phone || '',
      name: name || '',
      date,
      time,
      contactId: contactId || '',
      location: location || '',
      metadata: metadata || {},
      paymentStatus: response.data.status || 'pending',
      bookingStatus: 'awaiting_payment',
    });

    res.json({
      bookingId,
      paymentId,
      paymentUrl: response.data.url || response.data.payment_url,
      clientSecret: response.data.client_secret,
      status: response.data.status,
    });

  } catch (error) {
    console.error('Payment creation error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error.response?.data || error.message,
    });
  }
});

app.get('/api/bookings/:bookingId', async (req, res) => {
  try {
    const booking = await getBooking(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Convert snake_case back to camelCase for frontend
    const camelCaseBooking = {};
    for (const [key, value] of Object.entries(booking)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      camelCaseBooking[camelKey] = value;
    }

    res.json(camelCaseBooking);
  } catch (error) {
    console.error('Booking status error:', error.message);
    res.status(500).json({ error: 'Failed to load booking' });
  }
});

// Webhook endpoint for Pesaswap payment status updates
app.post('/api/webhook/pesaswap', async (req, res) => {
  try {
    const event = req.body;
    const paymentEvent = extractPaymentEvent(event);

    console.log('Webhook received:', paymentEvent);

    switch (paymentEvent.type) {
      case 'payment_succeeded':
      case 'succeeded':
      case 'paid': {
        const bookingId = paymentEvent.metadata.bookingId || paymentEvent.paymentId;
        const booking = await updateBooking(bookingId, {
          paymentStatus: 'succeeded',
          bookingStatus: 'payment_verified',
          paymentWebhook: paymentEvent.raw,
        });

        if (!booking) {
          console.error('No booking found for payment:', paymentEvent.paymentId);
          break;
        }

        try {
          const ghlAppointment = await createLeadConnectorAppointment(booking);
          await updateBooking(booking.id, {
            bookingStatus: 'confirmed',
            ghlAppointmentId: ghlAppointment.id || ghlAppointment.appointment?.id || '',
            ghlResponse: ghlAppointment,
          });
        } catch (bookingError) {
          console.error('GHL booking error:', bookingError.response?.data || bookingError.message);
          await updateBooking(booking.id, {
            bookingStatus: 'ghl_booking_failed',
            ghlError: bookingError.response?.data || bookingError.message,
          });
        }
        break;
      }

      case 'payment_failed':
      case 'failed':
        await updateBooking(paymentEvent.metadata.bookingId || paymentEvent.paymentId, {
          paymentStatus: 'failed',
          bookingStatus: 'payment_failed',
          paymentWebhook: paymentEvent.raw,
        });
        break;

      case 'payment_processing':
      case 'processing':
        await updateBooking(paymentEvent.metadata.bookingId || paymentEvent.paymentId, {
          paymentStatus: 'processing',
          bookingStatus: 'awaiting_payment',
          paymentWebhook: paymentEvent.raw,
        });
        break;

      case 'payment_cancelled':
      case 'cancelled':
        await updateBooking(paymentEvent.metadata.bookingId || paymentEvent.paymentId, {
          paymentStatus: 'cancelled',
          bookingStatus: 'payment_cancelled',
          paymentWebhook: paymentEvent.raw,
        });
        break;

      default:
        console.log('Unhandled webhook event:', paymentEvent.type);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Payment status check endpoint
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const response = await axios.get(
      `${PESASWAP_API_URL}/payments/${paymentId}`,
      {
        headers: {
          'api-key': process.env.PESASWAP_API_KEY,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('Payment status check error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to check payment status',
      details: error.response?.data || error.message,
    });
  }
});

// Start server
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`CORS origin: ${process.env.CORS_ORIGIN}`);
      console.log(`Pesaswap API URL: ${PESASWAP_API_URL}`);
      console.log(`Database: PostgreSQL`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
