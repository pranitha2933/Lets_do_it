const express = require('express');
const multer = require('multer');
const Event = require('../models/Event');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post('/events', upload.single('image'), async (req, res) => {
    try {
      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        country: req.body.country,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        image: req.file.path,
        price: req.body.price,
      });
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get("/latest", async (req, res) => {
    try {
      const latestEvent = await Event.findOne().sort({ date: -1 }); // Sort by latest date
      if (!latestEvent) return res.status(404).json({ message: "No events found" });
      res.json(latestEvent);
    } catch (error) {
      res.status(500).json({ message: "Error fetching event", error });
    }
  });
  
  module.exports = router;