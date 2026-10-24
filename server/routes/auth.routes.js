const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 6 characters, one number, one lowercase and one uppercase letter
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide email, password and name" });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address" });
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      message: "Password must have at least 6 characters and contain one number, one lowercase and one uppercase letter",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({ user: { _id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    const passwordCorrect = user && (await bcrypt.compare(password, user.password));

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const payload = { _id: user._id, email: user.email, name: user.name };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
