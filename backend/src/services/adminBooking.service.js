const Booking = require("../models/Booking");
const transaction = require("../utils/transaction");
const ApiError = require("../utils/ApiError");
const Maintenance = require("../models/Maintenance");

class AdminBookingService {
  async allBookings(query) {
    const {
      page = 1,

      limit = 10,

      status,

      space,

      member,
      date,
    } = query;

    const filter = {};

    if (status) filter.status = status;

    if (space) filter.space = space;

    if (member) filter.member = member;

    if (date) {
      const start = new Date(date);

      start.setHours(0, 0, 0, 0);

      const end = new Date(date);

      end.setHours(23, 59, 59, 999);

      filter.startTime = {
        $lt: end,
      };

      filter.endTime = {
        $gt: start,
      };
    }

    const total = await Booking.countDocuments(filter);

    const bookings = await Booking.find(filter)

      .populate("space")

      .populate("member", "name email")

      .skip((page - 1) * limit)

      .limit(Number(limit))

      .sort({
        createdAt: -1,
      });

    return {
      total,

      currentPage: Number(page),

      totalPages: Math.ceil(total / limit),

      data: bookings,
    };
  }

  async approve(id) {
    return transaction(async (session) => {
      const booking = await Booking.findById(id)

        .session(session);

      if (!booking)
        throw new ApiError(
          404,

          "Booking not found",
        );

      const maintenance = await Maintenance.findOne({
        space: booking.space,

        startTime: { $lt: booking.endTime },

        endTime: { $gt: booking.startTime },
      });

      if (maintenance) {
        throw new ApiError(
          400,

          "Cannot approve booking. Space is under maintenance during the selected time.",
        );
      }

      booking.status = "approved";

      await booking.save({
        session,
      });

      await Booking.updateMany(
        {
          _id: {
            $ne: booking._id,
          },

          space: booking.space,

          status: "pending",

          startTime: {
            $lt: booking.endTime,
          },

          endTime: {
            $gt: booking.startTime,
          },
        },
        {
          $set: {
            status: "rejected",

            rejectionReason: "Another booking approved",
          },
        },
        {
          session,
        },
      );

      return booking;
    });
  }

  async reject(id, reason) {
    const booking = await Booking.findById(id);

    if (!booking) throw new ApiError(404, "Booking not found");

    booking.status = "rejected";

    booking.rejectionReason = reason;

    await booking.save();

    return booking;
  }
}

module.exports = new AdminBookingService();
