const express = require("express");

const router = express.Router();

const userPreferences = require("../data/preferences");

router.post("/", (req, res) => {
  const { email, interests } = req.body;

  if (!email || !Array.isArray(interests)) {
    return res.status(400).json({
      message: "Email and interests are required",
    });
  }

  userPreferences[email] = interests;

  res.json({
    message: "Preferences saved",
    interests,
  });
});

router.get("/:email", (req, res) => {
  const email = req.params.email;

  res.json({
    interests: userPreferences[email] || [],
  });
});

module.exports = router;