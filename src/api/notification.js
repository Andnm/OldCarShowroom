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

export const getNofiticationList = async (token) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.get("/notifications");
        return response;
    } catch (error) {
        return error;
    }
};

export const setNofitication = async (token, notification_id) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.patch("/notifications", notification_id);
        return response;
    } catch (error) {
        return error;
    }
};

export const setNofiticationAll = async (token) => {
    try {
        const instance = createAxiosInstance(token);
        const response = await instance.patch("/notifications/all");
        return response;
    } catch (error) {
        return error;
    }
};
