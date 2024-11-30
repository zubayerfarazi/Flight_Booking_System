const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { rateLimitWindow, rateLimitMax } = require("./secret");
const seedRouter = require("./routes/seed.router");
const userRouter = require("./routes/user.router");
const { errorResponse } = require("./helper/responseController");
const authRouter = require("./routes/auth.router");
const flightRouter = require("./routes/flights.route");
const bookingRouter = require("./routes/booking.router");

const app = express();

const limiter = rateLimit({
  windowMs: rateLimitWindow,
  limit: rateLimitMax,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    sameSite: "none",
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(xssClean());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", seedRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", bookingRouter);

//Testing API
app.get("/test", (req, res) => {
  res.status(200).send("Congratulations on you first server");
});

//client side error
app.use((req, res, next) => {
  next(createError(404, "Route is not found"));
});

//server side error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
