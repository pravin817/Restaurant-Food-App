const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Configure the dotenv
dotenv.config();

// connect with Database
connectDB();

// Rest Object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to Food App Server</h1>`);
});

// PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT}`.bgGreen.white);
});
