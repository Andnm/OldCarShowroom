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

export const getFavorCarList = async (token) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.get("/users/favorites/all");
        return response;
    } catch (error) {
        return error.response;
    }
};

export const addFavorCar = async (token, licensePlate) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.post(`/users/favorites/${licensePlate}`);
        return response;
    } catch (error) {
        console.error("Error add favor car:", error);
        return error.response;
    }
};

export const deleteFavorCar = async (token, licensePlate) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.delete(`/users/favorites/${licensePlate}`);
        return response;
    } catch (error) {
        console.error("Error delete car:", error);
        return error.response;
    }
};

export const deleteAllFavorCar = async (token) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.delete(`/users/favorites/removeAll`);
        return response;
    } catch (error) {
        console.error("Error delete all car:", error);
        return error.response;
    }
};
