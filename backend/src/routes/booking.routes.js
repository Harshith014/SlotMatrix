const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const validate = require("../middleware/validator");

const controller = require("../controllers/booking.controller");

const { bookingValidator } = require("../validators/booking.validator");

router.post(
  "/",

  auth,

  bookingValidator,

  validate,

  controller.create,
);

router.get(
  "/my",

  auth,

  controller.myBookings,
);

router.patch(
  "/:id/cancel",

  auth,

  controller.cancel,
);

router.get(
  "/availability/:spaceId",

  controller.availability,
);

module.exports = router;
