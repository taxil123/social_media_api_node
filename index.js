const userRouter = require("./routes/user");
const globalErrorHandler = require("./controllers/error-handler-controller");
const AppError = require("./utils/appError");

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/sampledb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport Config
require("dotenv").config();

app.use("/api/v1/users", userRouter);

app.listen(3001, () => {
  console.log("Server Started at 3001");
});
