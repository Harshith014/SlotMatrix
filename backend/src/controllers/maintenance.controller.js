const asyncHandler = require("../middleware/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const service = require("../services/maintenance.service");

exports.create = asyncHandler(async (req, res) => {
  const maintenance = await service.create(req.body);

  res.status(201).json(
    new ApiResponse(
      201,

      "Maintenance Added",

      maintenance,
    ),
  );
});

exports.all = asyncHandler(async (req, res) => {
  const data = await service.all();

  res.json(
    new ApiResponse(
      200,

      "Maintenance",

      data,
    ),
  );
});

exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);

  res.json(
    new ApiResponse(
      200,

      "Maintenance Deleted",
    ),
  );
});
