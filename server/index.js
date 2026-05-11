import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const PESASWAP_API_URL = process.env.PESASWAP_API_URL || 'https://api.sandbox.pesaswap.io';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Create payment endpoint
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, currency, email, phone, name, metadata } = req.body;

    // Validate required fields
    if (!amount || !currency || !email) {
      return res.status(400).json({
        error: 'Missing required fields: amount, currency, email'
      });
    }

    // Prepare Pesaswap payment request
    const paymentData = {
      amount: Math.round(amount * 100), // Convert to cents/smallest unit if needed
      currency: currency,
      customer: {
        email: email,
        name: name || '',
        phone: phone || '',
      },
      metadata: metadata || {},
      // Set confirm=true and capture_method=automatic for one-step payment
      confirm: true,
      capture_method: 'automatic',
      // Add redirect URLs for success/failure
      return_url: `${process.env.CORS_ORIGIN}/payment/success`,
      cancel_url: `${process.env.CORS_ORIGIN}/payment/failure`,
    };

    // Call Pesaswap API to create payment
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

    // Return payment details to frontend
    res.json({
      paymentId: response.data.id,
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

// Webhook endpoint for LeadConnector appointment bookings
app.post('/api/webhook/leadconnector', async (req, res) => {
  try {
    const webhookData = req.body;

    console.log('LeadConnector webhook received:', JSON.stringify(webhookData, null, 2));

    // Extract booking details from webhook
    // LeadConnector webhook structure varies by event type
    // Common fields for appointment booked:
    const appointment = webhookData.appointment || {};
    const contact = webhookData.contact || {};

    // Extract relevant booking information
    const bookingDetails = {
      appointmentId: appointment.id || webhookData.id,
      appointmentType: appointment.appointmentType || appointment.type || 'Consultation',
      date: appointment.start || appointment.date || appointment.startTime,
      time: appointment.startTime || appointment.time,
      amount: appointment.price || appointment.amount || appointment.paymentAmount || 0,
      currency: appointment.currency || 'KES',
      email: contact.email || appointment.email,
      phone: contact.phone || appointment.phone,
      name: contact.name || appointment.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
    };

    console.log('Extracted booking details:', bookingDetails);

    // Create Pesaswap payment
    const paymentData = {
      amount: Math.round(parseFloat(bookingDetails.amount) * 100), // Convert to cents
      currency: bookingDetails.currency,
      customer: {
        email: bookingDetails.email,
        name: bookingDetails.name,
        phone: bookingDetails.phone,
      },
      metadata: {
        appointmentId: bookingDetails.appointmentId,
        appointmentType: bookingDetails.appointmentType,
        date: bookingDetails.date,
        time: bookingDetails.time,
        source: 'leadconnector',
      },
      confirm: true,
      capture_method: 'automatic',
      return_url: `${process.env.CORS_ORIGIN}/payment/success`,
      cancel_url: `${process.env.CORS_ORIGIN}/payment/failure`,
    };

    console.log('Creating Pesaswap payment with data:', paymentData);

    // Call Pesaswap API to create payment
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

    console.log('Pesaswap payment created:', response.data);

    // In a real implementation, you would:
    // 1. Save the payment record to your database
    // 2. Send the payment URL to the customer via email/SMS
    // 3. Update the booking status in LeadConnector via their API

    res.json({
      received: true,
      paymentCreated: true,
      paymentId: response.data.id,
      paymentUrl: response.data.url || response.data.payment_url,
      message: 'Payment created successfully. Send payment URL to customer.',
    });

  } catch (error) {
    console.error('LeadConnector webhook error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Webhook processing failed',
      details: error.response?.data || error.message,
    });
  }
});

// Webhook endpoint for Pesaswap payment status updates
app.post('/api/webhook/pesaswap', async (req, res) => {
  try {
    const event = req.body;

    // Verify webhook signature (recommended for production)
    // const signature = req.headers['x-pesaswap-signature'];
    // if (!verifyWebhookSignature(signature, req.body, process.env.WEBHOOK_SECRET)) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    console.log('Webhook received:', event);

    // Handle different webhook events
    switch (event.type) {
      case 'payment_succeeded':
        console.log('Payment succeeded:', event.data);
        // Update booking status in your database
        // Send confirmation email to customer
        // Notify clinic about new booking
        break;

      case 'payment_failed':
        console.log('Payment failed:', event.data);
        // Update booking status to failed
        // Send notification to customer about failed payment
        break;

      case 'payment_processing':
        console.log('Payment processing:', event.data);
        // Update booking status to processing
        break;

      case 'payment_cancelled':
        console.log('Payment cancelled:', event.data);
        // Update booking status to cancelled
        break;

      default:
        console.log('Unhandled webhook event:', event.type);
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS origin: ${process.env.CORS_ORIGIN}`);
  console.log(`Pesaswap API URL: ${PESASWAP_API_URL}`);
});
