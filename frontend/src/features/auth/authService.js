export const saveTokens = (data) => {
  localStorage.setItem("accessToken", data.accessToken);

  localStorage.setItem("refreshToken", data.refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");

  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => localStorage.getItem("accessToken");

export const getRefreshToken = () => localStorage.getItem("refreshToken");
