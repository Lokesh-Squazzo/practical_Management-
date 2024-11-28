require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../routes/userRoutes");
const subjectRoutes = require("../routes/subjectRoutes");
const practicalRoutes = require("../routes/practicalRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/subjects", subjectRoutes);
app.use("/practicals", practicalRoutes);


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
