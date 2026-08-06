const mongoose = require("mongoose");

const bookingLockSchema = new mongoose.Schema(
  {
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      unique: true,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

bookingLockSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
  },
);

module.exports = mongoose.model("BookingLock", bookingLockSchema);
