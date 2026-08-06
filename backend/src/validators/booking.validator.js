const { body } = require("express-validator");

exports.bookingValidator = [

    body("space")
        .isMongoId(),

    body("startTime")
        .isISO8601(),

    body("endTime")
        .isISO8601()

];