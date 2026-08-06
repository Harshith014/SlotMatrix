const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["desk", "meeting-room"],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    description: {
      type: String,
      default: "",
    },

    location: {
      floor: String,
      building: String,
    },

    images: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

spaceSchema.index({
  type: 1,
  capacity: 1,
});

spaceSchema.index({
  name: "text",
});

module.exports = mongoose.model("Space", spaceSchema);
