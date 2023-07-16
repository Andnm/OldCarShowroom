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

export const getUserList = async (token) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};

export const getUserByEmail = async (token, email) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.get(`/users/${email}`);
    return response;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return [];
  }
};

export const updateUserByEmail = async (token, email) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.patch(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error update user by email:", error);
    return [];
  }
};

export const deleteUserByEmail = async (token, email) => {
  try {
    const instance = createAxiosInstance(token);
    const response = await instance.delete(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error delete user by email:", error);
    return [];
  }
};
