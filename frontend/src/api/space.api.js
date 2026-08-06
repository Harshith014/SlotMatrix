import api from "./axios";

export const fetchSpaces = (params) => {
  return api.get("/spaces", {
    params,
  });
};

export const fetchSpace = (id) => {
  return api.get(`/spaces/${id}`);
};

export const fetchAvailability = (
  spaceId,

  date,
) => {
  return api.get(
    `/bookings/availability/${spaceId}`,

    {
      params: {
        date,
      },
    },
  );
};
