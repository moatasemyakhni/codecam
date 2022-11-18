import { apiManager } from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";


const photosBaseUrl = '/photos';
const config = {
    headers: {
        Authorization: '',
    },
};
const getToken = async () => await AsyncStorage.getItem('token');


export interface getAllPhotosForUserInterface {
    (
        userId: string,
    ): Promise<any>
}

export const getAllPhotosForUser: getAllPhotosForUserInterface = async (userId) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.get(`${photosBaseUrl}/${userId}`, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}


export interface deletePhotoInterface {
    (
        photoId: string,
    ): Promise<any>
}

export const deletePhoto: deletePhotoInterface = async (photoId) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.delete(`${photosBaseUrl}/${photoId}`, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}


export interface getPhotoByIdInterface {
    (
        photoId: string,
    ): Promise<any>
}

export const getPhotoById: getPhotoByIdInterface = async (photoId) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.get(`${photosBaseUrl}/photo/${photoId}`, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}


export interface EditPhotoInterface {
    (
        photoId: string,
        data: {
            codeTextContent: string,
            programmingLanguage: string,
            snippetName: string,
        } 
    ) : Promise<any>
}

export const editPhotoById:EditPhotoInterface = async (photoId, data) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.patch(`${photosBaseUrl}/photo/${photoId}`, data, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}


export interface savePhotoInterface {
    (
        data: {
            codeTextContent: string,
            snippetName: string,
            userId: string,
            programmingLanguage: string,
            base64Photo: string,
        }
    ) : Promise<any>
}

export const savePhoto = async (data) => {
    try {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        const response = await apiManager.post(`${photosBaseUrl}/`, data, config);
        return response.data;
    } catch (error) {
        return error.hasOwnProperty('response')? error.response.data : {...error, error: true};
    }
}