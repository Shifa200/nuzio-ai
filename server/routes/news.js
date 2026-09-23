const express = require("express");

const router = express.Router();

const {
    userPreferences ,
} = require("../data/preferences");

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
  },{
    id: 4,
    category: "BUSINESS",
    title:
      "Small businesses are adopting smarter digital tools",
    summary:
      "Modern software is helping smaller teams automate repetitive work and make faster decisions.",
    duration: "3 MIN",
  },
  {
    id: 5,
    category: "SCIENCE",
    title:
      "Researchers explore new ways to understand complex systems",
    summary:
      "Scientists are using advanced computing and new research methods to study increasingly complex questions.",
    duration: "4 MIN",
  },
  {
    id: 6,
    category: "FINANCE",
    title:
      "Digital finance continues to reshape everyday payments",
    summary:
      "New financial technologies are changing how people manage payments, savings, and everyday transactions.",
    duration: "3 MIN",
  },
  {
    id: 7,
    category: "AI & TECHNOLOGY",
    title:
      "Developers are using AI tools to build software faster",
    summary:
      "AI-assisted development is becoming part of everyday software workflows for developers and teams.",
    duration: "3 MIN",
  },
  {
    id: 8,
    category: "STARTUPS",
    title:
      "Early-stage founders are focusing on smaller, focused products",
    summary:
      "A growing number of startups are targeting specific problems instead of trying to serve everyone at once.",
    duration: "3 MIN",
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