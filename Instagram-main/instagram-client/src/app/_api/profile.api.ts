import apiServices from "@/service/api.service";
import { AxiosResponse } from "axios";
import { SuccessGetPostInProfile, SuccessGetProfile } from "../_type/profile.type";

export const ProfileApi = {
    getPostByUserId: async (userId: string, page: string): Promise<SuccessReponse<SuccessGetPostInProfile>> => {
        const response =  await apiServices.get(`/post/all/${userId}?page=${page}`) as AxiosResponse
        return response.data
    },
    getProfile: async (userId: string): Promise<AxiosResponse<SuccessGetProfile>> => {
        const response =  await apiServices.get(`/${userId}`) as AxiosResponse
        return response
    }
};

