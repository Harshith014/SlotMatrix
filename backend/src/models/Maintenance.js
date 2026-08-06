const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
      index: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

maintenanceSchema.index({
  space: 1,
  startTime: 1,
  endTime: 1,
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
