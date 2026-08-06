const Maintenance = require("../models/Maintenance");

class MaintenanceService {
  async create(data) {
    return await Maintenance.create(data);
  }

  async remove(id) {
    await Maintenance.findByIdAndDelete(id);
  }

  async all() {
    return await Maintenance.find()

      .populate("space")

      .sort({
        startTime: -1,
      });
  }
}

module.exports = new MaintenanceService();
