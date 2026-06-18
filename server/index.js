import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

let pool = null;

const connectDB = async () => {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message);
    pool = null;
    throw error;
  }

  return pool;
};

const initDB = async () => {
  const db = await connectDB();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      booking_id VARCHAR(255) UNIQUE NOT NULL,
      payment_id VARCHAR(255),
      patient_name VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      service_type VARCHAR(255),
      package_id VARCHAR(255),
      package_name VARCHAR(255),
      amount DECIMAL(10, 2),
      currency VARCHAR(10),
      duration_minutes INTEGER,
      appointment_date VARCHAR(50),
      appointment_time VARCHAR(50),
      calendar_id VARCHAR(255),
      location_id VARCHAR(255),
      payment_status VARCHAR(50) DEFAULT 'pending',
      booking_status VARCHAR(50) DEFAULT 'pending_payment',
      payment_reference VARCHAR(255),
      metadata JSONB,
      ghl_appointment_id VARCHAR(255),
      ghl_response JSONB,
      ghl_error JSONB,
      hold_expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_payment_id ON bookings(payment_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
    CREATE INDEX IF NOT EXISTS idx_bookings_booking_status ON bookings(booking_status);
    CREATE INDEX IF NOT EXISTS idx_bookings_calendar_date_time_status ON bookings(calendar_id, appointment_date, appointment_time, booking_status);
  `;

  try {
    await db.query(createTableQuery);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error.message);
    throw error;
  }
};

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
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    // For production, allow the specific Vercel domain
    if (process.env.NODE_ENV === 'production' && origin === 'https://dorcus-muchiri-plum.vercel.app') {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
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
    const customerId = `cust_${crypto.createHash('sha256').update(email.toLowerCase()).digest('hex').slice(0, 32)}`;
    const paymentData = {
      amount: Math.round(selectedPackage.amount * 100),
      currency: selectedPackage.currency,
      customer: {
        id: customerId,
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
