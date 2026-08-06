const asyncHandler = require("../middleware/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const service = require("../services/space.service");

exports.create = asyncHandler(async (req, res) => {
  const space = await service.create(req.body);

  res.status(201).json(
    new ApiResponse(
      201,

      "Space Created",

      space,
    ),
  );
});

exports.update = asyncHandler(async (req, res) => {
  const space = await service.update(
    req.params.id,

    req.body,
  );

  res.json(
    new ApiResponse(
      200,

      "Space Updated",

      space,
    ),
  );
});

exports.remove = asyncHandler(async (req, res) => {
  await service.delete(req.params.id);

  res.json(
    new ApiResponse(
      200,

      "Space Deleted",
    ),
  );
});

exports.getOne = asyncHandler(async (req, res) => {
  const space = await service.getOne(req.params.id);

  res.json(
    new ApiResponse(
      200,

      "Space Details",

      space,
    ),
  );
});

exports.getAll = asyncHandler(async (req, res) => {
  const spaces = await service.getAll(req.query);

  res.json(
    new ApiResponse(
      200,

      "Spaces",

      spaces,
    ),
  );
});
