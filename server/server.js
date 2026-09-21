require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const preferencesRoutes = require("./routes/preferences");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes)
app.use("/api/preferences", preferencesRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Nuzio AI backend is running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});