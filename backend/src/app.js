const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const errorHandler = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const spaceRoutes = require("./routes/space.routes");
const bookingRoutes = require("./routes/booking.routes");
const adminBookingRoutes = require("./routes/adminBooking.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "Workspace Booking API",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/spaces", spaceRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/admin/bookings", adminBookingRoutes);
app.use("/api/v1/maintenance", maintenanceRoutes);

app.use(errorHandler);

module.exports = app;
