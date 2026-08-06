const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

const validate = require("../middleware/validator");

const controller = require("../controllers/space.controller");

const { spaceValidator } = require("../validators/space.validator");

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.post(
  "/",
  auth,
  role("admin"),
  spaceValidator,
  validate,
  controller.create,
);

router.put(
  "/:id",
  auth,
  role("admin"),
  spaceValidator,
  validate,
  controller.update,
);

router.delete("/:id", auth, role("admin"), controller.remove);

module.exports = router;
