const Booking = require("../models/Booking");
const Maintenance = require("../models/Maintenance");
const Space = require("../models/Space");
const transaction = require("../utils/transaction");
const ApiError = require("../utils/ApiError");
const lockService = require("./lock.service");

class BookingService {
  async create(userId, body) {
    const { space } = body;

    await lockService.acquire(space);

    try {
      return await transaction(async (session) => {
        const {
          startTime,

          endTime,
        } = body;

        const start = new Date(startTime);

        const end = new Date(endTime);

        if (start >= end) throw new ApiError(400, "Invalid slot");

        if (start < new Date()) throw new ApiError(400, "Past booking");

        const maintenance = await Maintenance.findOne({
          space,

          startTime: {
            $lt: end,
          },

          endTime: {
            $gt: start,
          },
        }).session(session);

        if (maintenance) throw new ApiError(409, "Maintenance window");

        const overlap = await Booking.findOne({
          space,

          status: {
            $in: ["pending", "approved"],
          },

          startTime: {
            $lt: end,
          },

          endTime: {
            $gt: start,
          },
        }).session(session);

        if (overlap) throw new ApiError(409, "Time slot unavailable");

        const booking = await Booking.create(
          [
            {
              member: userId,

              space,

              startTime: start,

              endTime: end,
            },
          ],
          {
            session,
          },
        );

        return booking[0];
      });
    } finally {
      await lockService.release(space);
    }
  }

  async myBookings(userId) {
    return await Booking.find({
      member: userId,
    })

      .populate("space")

      .sort({
        startTime: -1,
      });
  }

  async cancel(id, userId) {
    const booking = await Booking.findById(id);

    if (!booking) throw new ApiError(404, "Booking not found");

    if (booking.member.toString() !== userId)
      throw new ApiError(403, "Unauthorized");

    if (!["pending", "approved"].includes(booking.status))
      throw new ApiError(400, "Cannot cancel booking");

    if (booking.startTime < new Date())
      throw new ApiError(400, "Past booking cannot be cancelled");

    booking.status = "cancelled";

    await booking.save();

    return booking;
  }

  async availability(spaceId, date) {
    const start = new Date(date);

    const end = new Date(date);

    end.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      space: spaceId,

      status: {
        $in: ["pending", "approved"],
      },

      startTime: {
        $lte: end,
      },

      endTime: {
        $gte: start,
      },
    }).select("startTime endTime status");

    const maintenance = await Maintenance.find({
      space: spaceId,

      startTime: {
        $lte: end,
      },

      endTime: {
        $gte: start,
      },
    }).select("startTime endTime");

    return {
      bookings,
      maintenance,
    };
  }
}

module.exports = new BookingService();
