import apiServices from "@/service/api.service";
import { IRegisterForm } from "../_type/registerType";
import { AxiosResponse } from "axios";
import { ILoginForm, SuccessLogin } from "../_type/loginType";

export const AuthApi = {
  register: async (data: Omit<IRegisterForm, 'passwordConfirmation'>): Promise<SuccessReponse<any>> => {
    const response =  await apiServices.post("/auth/register", data) as AxiosResponse;
    return response.data ;
  },
  login: async (data: ILoginForm): Promise<SuccessReponse<SuccessLogin>> => {
    const response =  await apiServices.post("/auth/login", data) as AxiosResponse;
    return response.data ;
  }
};
