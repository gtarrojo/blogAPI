const express = require("express");
const cors = require("cors");

//Create express Application
const app = express();
app.use(express.json());
app.use(cors());

//Route
app.use("/api", require("./routes/api.routes"));

// error handlers
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
