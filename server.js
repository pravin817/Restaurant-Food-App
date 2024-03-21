const express = require("express");

// Rest Object
const app = express();

// route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to Food App</h1>`);
});

// PORT
const PORT = 8080;

//Listen
app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT}`);
});
