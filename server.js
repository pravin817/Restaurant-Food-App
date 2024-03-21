const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Configure the dotenv
dotenv.config();

// Rest Object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/test", require("./routes/testRoute"));
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to Food App Server</h1>`);
});

// PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT}`.bgGreen.white);
});
