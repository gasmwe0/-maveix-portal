const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  date: String,
  status: { type: String, default: 'pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.patch('/:id/approve', async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  res.json(updated);
});

router.patch('/:id/reject', async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json(updated);
});

module.exports = router;
