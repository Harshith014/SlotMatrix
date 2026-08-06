const BookingLock = require("../models/BookingLock");

const ApiError = require("../utils/ApiError");

class LockService {
  async acquire(space) {
    try {
      return await BookingLock.create({
        space,

        expiresAt: new Date(Date.now() + 10000),
      });
    } catch {
      throw new ApiError(
        409,

        "Another booking request is already processing.",
      );
    }
  }

  async release(space) {
    await BookingLock.deleteOne({
      space,
    });
  }
}

module.exports = new LockService();
