const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
app.use(cors());
app.use(express.json());

// Routes
const bookingRoutes = require('./routes/bookings');
const stripeRoutes = require('./routes/checkout');

app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', stripeRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Maveix Portal Backend is Live 🚀');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});
