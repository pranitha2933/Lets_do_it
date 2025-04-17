const express = require("express");
const { signup, login } = require("../controllers/recruiterController");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const { getRecruiterProfile } = require("../controllers/recruiterController");
const router = express.Router();

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/signup", upload.single("image"), signup);
router.post("/login", login);
router.get("/profile", auth, getRecruiterProfile);

module.exports = router;
