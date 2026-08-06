const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const ApiError = require("../utils/ApiError");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthService {
  async register(data) {
    const { name, email, password } = data;

    const exists = await User.findOne({ email });

    if (exists) throw new ApiError(409, "Email already registered");

    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  }

  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(401, "Invalid credentials");

    const match = await user.comparePassword(password);

    if (!match) throw new ApiError(401, "Invalid credentials");

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      user: user._id,

      token: refreshToken,

      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user,

      accessToken,

      refreshToken,
    };
  }

  async refresh(token) {
    if (!token) throw new ApiError(401, "Refresh token missing");

    const saved = await RefreshToken.findOne({
      token,
    });

    if (!saved) throw new ApiError(401, "Invalid refresh token");

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload.id);

    if (!user) throw new ApiError(404, "User not found");

    const accessToken = generateAccessToken(user);

    return accessToken;
  }

  async logout(token) {
    await RefreshToken.deleteOne({
      token,
    });
  }

  async profile(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }
}

module.exports = new AuthService();
