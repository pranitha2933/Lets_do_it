const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const path = require("path");
const fs = require("fs");
dotenv.config();
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client", "build")));
 // ✅ Serves images correctly

// ✅ Serves images publicly

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // ✅ Ensures images go to "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.post("/events", upload.single("image"), async (req, res) => {
    try {
        const { title, description, date, time, location, country, category, price } = req.body; // ✅ Added "time"
        const imagePath = req.file ? `uploads/${req.file.filename}` : null;

        const newEvent = new Event({
            title,
            description,
            date,
            time, // ✅ Store time in MongoDB
            location,
            country,
            category,
            price,
            image: imagePath
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/maps/:location", (req, res) => {
  const location = req.params.location;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;
  res.json({ url });
});


app.post("/payment", async (req, res) => {
  try {
      const { amount, token } = req.body;

      const charge = await stripe.charges.create({
          amount: amount * 100, // Convert to cents
          currency: "inr",
          source: token.id,
          description: "Event Ticket Purchase",
      });

      res.json({ success: true, charge });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
