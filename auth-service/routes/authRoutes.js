const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("/auth/login HIT");
  console.log("BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    let user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      user = new User({ name, email, password });
      await user.save();
      console.log("New user created");
    }

    return res.json({ message: "Login successful" });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
