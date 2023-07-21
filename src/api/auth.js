import axios from "axios";
import LINK_API from "../constants/link";

export const signIn = async (data) => {
  try {
    const response = await axios.post(`${LINK_API}` + "/auth/signin", data);
    return response;
  } catch (error) {
    return [];
  }
};

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${LINK_API}` + "/auth/signup", data);
    return response;
  } catch (error) {
    console.error("Error singup:", error);
    return error;
  }
};
