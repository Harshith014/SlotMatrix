import api from "./axios";

export const register = (data) => api.post("/auth/register", data);

export const login = (data) => api.post("/auth/login", data);

export const profile = () => api.get("/auth/profile");

export const logout = (refreshToken) =>
  api.post("/auth/logout", {
    refreshToken,
  });

export const refresh = (refreshToken) =>
  api.post("/auth/refresh", {
    refreshToken,
  });
