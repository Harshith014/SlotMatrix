const asyncHandler = require("../middleware/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json(
    new ApiResponse(
      201,

      "Registration Successful",

      user,
    ),
  );
});

exports.login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  res.json(
    new ApiResponse(
      200,

      "Login Successful",

      data,
    ),
  );
});

exports.refresh = asyncHandler(async (req, res) => {
  const token = await authService.refresh(req.body.refreshToken);

  res.json(
    new ApiResponse(
      200,

      "Access Token Generated",

      {
        accessToken: token,
      },
    ),
  );
});

exports.logout = asyncHandler(async (req, res) => {
  await authService.logout(req.body.refreshToken);

  res.json(
    new ApiResponse(
      200,

      "Logout Successful",
    ),
  );
});

exports.profile = asyncHandler(async (req, res) => {
  const user = await authService.profile(req.user.id);
  res.json(
    new ApiResponse(
      200,

      "Profile",

      user,
    ),
  );
});
