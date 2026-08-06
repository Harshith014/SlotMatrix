const { body } = require("express-validator");


exports.spaceValidator = [

    body("name")
        .optional()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("type")
        .optional()
        .isIn(["desk", "meeting-room"])
        .withMessage("Invalid space type"),

    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1")

];