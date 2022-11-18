import { apiManager } from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";


const usersBaseUrl = '/users';
const config = {
    headers: {
        Authorization: '',
    },
};
const getToken = async () => await AsyncStorage.getItem('token');

export const getUserInfo = async () => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.get(`${usersBaseUrl}/`, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data: {...error, error: true};
    }
}


export interface CodeOutputInterface {
    (data: {   
        source: string,
        language: string,
        inputs: string
    }): Promise<any>
}

export const codeOutput: CodeOutputInterface = async (data) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.post(`${usersBaseUrl}/run`, data, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data: {...error, error: true};
    }
}


export interface editFullNameInterface {
    (
        userId: string,
        data: {
            fullName: string
        }
    ) : Promise<any>
}

export const editFullName: editFullNameInterface = async (userId, data) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.patch(`${usersBaseUrl}/edit/name/${userId}`, data, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data: {...error, error: true};
    }
}


export interface editProfileInterface {
    (
        userId: string,
        data: {
            base64Photo: string,
        }
    ) : Promise<any>
}

export const editProfile: editProfileInterface = async (userId, data) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.patch(`${usersBaseUrl}/edit/photo/${userId}`, data, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data: {...error, error: true};
    }
}