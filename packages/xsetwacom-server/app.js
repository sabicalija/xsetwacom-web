const express = require("express");
const bodyParser = require("body-parser");

const screenRoutes = require("./routes/screen.js");
const deviceRoutes = require("./routes/device.js");
const generalRoutes = require("./routes/general.js");
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,  GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/devices", deviceRoutes);
app.use("/screens", screenRoutes);
app.use("", generalRoutes);

app.listen(8080);
