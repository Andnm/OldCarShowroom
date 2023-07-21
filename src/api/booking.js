import axios from "axios";
import LINK_API from "../constants/link";

const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBooking = async (token, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.post("/bookings", data);
    return response;
  } catch (error) {
    return [];
  }
};

export const getBooking = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get("/bookings");
    return response;
  } catch (error) {
    return [];
  }
};

export const cancelBooking = async (token, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.patch("/bookings" , data);
    return response;
  } catch (error) {
    return [];
  }
};

