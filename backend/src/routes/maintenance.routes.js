const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

const controller = require("../controllers/maintenance.controller");

router.use(auth);

router.use(role("admin"));

router.post("/", controller.create);

router.get("/", controller.all);

router.delete("/:id", controller.remove);

module.exports = router;