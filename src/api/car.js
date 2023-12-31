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
    const response = await axios.get(`${LINK_API}`+"/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching car list:", error);
    return [];
  }
};

export const getUserCarList = async (token) => {
  try {
      const instance = createAxiosInstance(token);
      const response = await instance.get("/cars/user");
      return response;
  } catch (error) {
      return error.response;
  }
};

export const getCarListByAdmin = async (token) => {
  try {
      const instance = createAxiosInstance(token);
      const response = await instance.get("/cars");
      return response;
  } catch (error) {
      return error.response;
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

export const changeCarStatusByAdmin = async (token, licensePlate, status) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.patch(`${LINK_API}/cars/changeStatus/${licensePlate}/${status}`);
    return response;
  } catch (error) {
    console.error("Error confirm car:", error);
    return error.response;
  }
}