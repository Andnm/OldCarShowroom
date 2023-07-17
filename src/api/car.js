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

export const getCarList = async () => {
  try {
    const response = await axios.get(`${LINK_API}` + "/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching car list:", error);
    return [];
  }
};

export const registerNewCar = async (token, data) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.post("/cars", data);
    return response;
  } catch (error) {
    console.error("Error register new car:", error);
    return error.response;
  }
};
