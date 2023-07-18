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

export const getAllSlot = async () => {
  try {
    const response = await axios.get(`${LINK_API}` + "/slots");
    return response;
  } catch (error) {
    console.error("Error fetching car list:", error);
    return [];
  }
};

export const getSlotByDateAndLicensePlate = async (licensePlate, date) => {
  try {
    const response = await axios.get(
      `${LINK_API}/slots/${licensePlate}/${date}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
