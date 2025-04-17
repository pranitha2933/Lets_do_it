const Recruiter = require("../models/Recruiter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file?.filename;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = await Recruiter.create({
      name,
      email,
      password: hashedPassword,
      image,
    });
    const token = jwt.sign({ id: newRecruiter._id }, process.env.JWT_SECRET);
    res.json({ recruiter: newRecruiter, token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET);
    res.json({ recruiter, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


exports.getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.recruiter.id);
    if (!recruiter) return res.status(404).json({ message: "Not found" });

    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
