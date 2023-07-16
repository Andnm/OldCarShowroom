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
