const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

const controller = require("../controllers/adminBooking.controller");

router.use(auth);

router.use(role("admin"));

router.get("/", controller.all);

router.patch("/:id/approve", controller.approve);

router.patch("/:id/reject", controller.reject);

module.exports = router;