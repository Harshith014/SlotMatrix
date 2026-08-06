const asyncHandler = require("../middleware/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const service = require("../services/adminBooking.service");

exports.all = asyncHandler(async (req, res) => {
  const data = await service.allBookings(req.query);

  res.json(
    new ApiResponse(
      200,

      "Bookings",

      data,
    ),
  );
});

exports.approve = asyncHandler(async (req, res) => {
  const booking = await service.approve(req.params.id);

  res.json(
    new ApiResponse(
      200,

      "Booking Approved",

      booking,
    ),
  );
});

exports.reject = asyncHandler(async (req, res) => {
  const booking = await service.reject(
    req.params.id,

    req.body.reason,
  );

  res.json(
    new ApiResponse(
      200,

      "Booking Rejected",

      booking,
    ),
  );
});
