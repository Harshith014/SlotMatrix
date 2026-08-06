const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth.controller");

const validate = require("../middleware/validator");

const {
  registerValidator,

  loginValidator,
} = require("../validators/auth.validator");

const auth = require("../middleware/auth.middleware");

const { authLimiter } = require("../middleware/rateLimiter");

router.post(
  "/register",

  authLimiter,

  registerValidator,

  validate,

  controller.register,
);

router.post(
  "/login",

  authLimiter,

  loginValidator,

  validate,

  controller.login,
);

router.post(
  "/refresh",

  controller.refresh,
);

router.post(
  "/logout",

  controller.logout,
);

router.get(
  "/profile",

  auth,

  controller.profile,
);

module.exports = router;
