const express = require("express");

const router = express.Router();

const userPreferences =
  require("../data/preferences");

const news = [
  {
    id: 1,
    category: "AI & TECHNOLOGY",
    title: "AI is changing how people discover and consume information",
    summary:
      "New AI tools are making personalized information faster and easier to access.",
    duration: "3 MIN",
  },
  {
    id: 2,
    category: "STARTUPS",
    title: "The latest startup trends are increasingly focused on AI products",
    summary:
      "Founders are building smaller, more focused products around artificial intelligence.",
    duration: "2 MIN",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title: "The future of personalized digital experiences",
    summary:
      "Personalization is becoming an important part of how modern applications are designed.",
    duration: "4 MIN",
  },
];

router.get("/", (req, res) => {
  const email = req.query.email;

  // If no email is provided, return all news
  if (!email) {
    return res.json(news);
  }

  const interests = userPreferences[email] || [];

  // Put matching stories first
  const personalizedNews = news.filter((item) =>
  interests.includes(item.category)
);

res.json(personalizedNews);

});

module.exports = router;