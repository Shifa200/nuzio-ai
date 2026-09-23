const express = require("express");

const router = express.Router();

const {
  userPreferences,
  savePreferences,
} = require("../data/preferences");

router.post("/", (req, res) => {
  const { email, interests } = req.body;

  if (!email || !Array.isArray(interests)) {
    return res.status(400).json({
      message: "Email and interests are required",
    });
  }

  userPreferences[email] = interests;

  savePreferences(userPreferences);

  res.json({
    message: "Preferences saved",
    interest: userPreferences[email],
  });
});

router.get("/:email", (req, res) => {
  const email = req.params.email;

  res.json({
    interests: userPreferences[email] || [],
  });
});

module.exports = router;