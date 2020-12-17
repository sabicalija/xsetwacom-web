const express = require("express");
const bodyParser = require("body-parser");

const generalRoutes = require("./routes/general.js");
const deviceRoutes = require("./routes/device.js");
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
app.use("", generalRoutes);

app.listen(8080);
