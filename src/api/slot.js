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
  // console.log("licensePlate", licensePlate)
  // console.log("date", date)
  try {
    const response = await axios.get(
      `${LINK_API}/slots/${licensePlate}/${date}`
    );
    // console.log('response api', response.data)
    return response.data;
  } catch (error) {
    console.log('error fetching slot', error)
    return [];
  }
};
