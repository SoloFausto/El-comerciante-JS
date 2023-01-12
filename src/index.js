const express = require("express"); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use("/routes/menu", v1WorkoutRouter);
