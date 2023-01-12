const express = require("express");
const router = express.Router();

router.get("/src/routes/menu/envases", (req, res) => {
  res.send("Get all workouts");
});
