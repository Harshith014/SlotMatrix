import api from "./axios";

export const getSpaces = (params) => api.get("/spaces", { params });

export const createSpace = (data) => api.post("/spaces", data);

export const updateSpace = (id, data) => api.put(`/spaces/${id}`, data);

export const deleteSpace = (id) => api.delete(`/spaces/${id}`);

export const getBookings = (params) =>
  api.get("/admin/bookings", {
    params,
  });

export const approveBooking = (id) =>
  api.patch(`/admin/bookings/${id}/approve`);

export const rejectBooking = (id, reason) =>
  api.patch(`/admin/bookings/${id}/reject`, {
    reason,
  });
