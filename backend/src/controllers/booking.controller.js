const asyncHandler = require("../middleware/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const service = require("../services/booking.service");

exports.create = asyncHandler(async (req, res) => {
  const booking = await service.create(
    req.user.id,

    req.body,
  );

  res.status(201).json(
    new ApiResponse(
      201,

      "Booking Created",

      booking,
    ),
  );
});

exports.myBookings = asyncHandler(async (req, res) => {
  const bookings = await service.myBookings(req.user.id);

  res.json(
    new ApiResponse(
      200,

      "My Bookings",

      bookings,
    ),
  );
});

exports.cancel = asyncHandler(async (req, res) => {
  const booking = await service.cancel(
    req.params.id,

    req.user.id,
  );

  res.json(
    new ApiResponse(
      200,

      "Booking Cancelled",

      booking,
    ),
  );
});

exports.availability = asyncHandler(async (req, res) => {
  const data = await service.availability(
    req.params.spaceId,

    req.query.date,
  );

  res.json(
    new ApiResponse(
      200,

      "Availability",

      data,
    ),
  );
});
