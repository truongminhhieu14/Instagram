import axios, { AxiosResponse } from "axios";
import { getToken, removeAllStorage, setToken } from "./storage.service";
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_NOT_SHOW_TOAST,
} from "@/util/constant/serverError";
import { refreshAccessToken } from "./auth.service";
import { removeEmpty } from "@/util/function/common";
import _ from "lodash";
import { toastify } from "@/components/common/toastify/Toastify";

const axiosApiInstance = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

class ApiService {
  isFetchingAccessToken = false;
  constructor() {
    axiosApiInstance.interceptors.request.use(
      async (config) => {
        const token = getToken();
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );

    axiosApiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        const accessToken = getToken();

        if (
          [
            ERROR_MESSAGE.TOKEN_EXPIRED,
            "INVALID_TOKEN",
            "SESSION_NOT_FOUND",
          ].includes(error?.response.data?.message) &&
          !originalRequest._retry &&
          accessToken
        ) {
          if (!this.isFetchingAccessToken) {
            this.isFetchingAccessToken = true;
            (async () => {
              const newAccessToken = await refreshAccessToken();
              setToken(newAccessToken.accessToken);
              this.isFetchingAccessToken = false;
              return newAccessToken.accessToken;
            })()
              .then()
              .catch((e) => {
                Promise.reject(e);
                removeAllStorage();
                window.location.href = "/login";
              });
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
    axiosApiInstance.interceptors.response.use(
      (response) => {
        return response as AxiosResponse;
      },
      (error) => {
        const originalRequest = error.config;
        const accessToken = getToken();

        if (
          [
            ERROR_MESSAGE.TOKEN_EXPIRED,
            "INVALID_TOKEN",
            "SESSION_NOT_FOUND",
          ].includes(error?.response?.data?.message) &&
          !originalRequest._retry &&
          originalRequest.url !== "/auth/business/token/refresh" &&
          accessToken
        ) {
          if (!this.isFetchingAccessToken) {
            this.isFetchingAccessToken = true;
            (async () => {
              const newToken = await refreshAccessToken();
              setToken(newToken.accessToken);
              this.isFetchingAccessToken = false;
              return newToken.accessToken;
            })()
              .then(() => {
                this.isFetchingAccessToken = false;
              })
              .catch((e) => {
                Promise.reject(e);
                removeAllStorage();
                window.location.href = "/login";
              });
          }

          return new Promise((resolve) => {
            // this.addRequestSubscriber((token) => {
            //   Object.assign(originalRequest.headers, {
            //     Authorization: `JWT ${token}`,
            //   });
            originalRequest._retry = true;
            resolve(axios(originalRequest));
            // });
          });
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  post(endpoint: string, _data?: any, params?: any) {
    return new Promise(async (resolve, reject) => {
      axiosApiInstance
        .post(endpoint, removeEmpty(_data), { params: removeEmpty(params) })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(this.handleError(error));
        });
    });
  }

  get(endpoint: string, params?: any, config?: any) {
    return new Promise(async (resolve, reject) => {
      axiosApiInstance
        .get(endpoint, { ...config, params: removeEmpty(params) })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  delete(endpoint: string, _data: any) {
    return new Promise(async (resolve, reject) => {
      axiosApiInstance
        .delete(endpoint, _data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  patch(endpoint: string, _data: any) {
    return new Promise(async (resolve, reject) => {
      axiosApiInstance
        .patch(endpoint, _data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  handleError(error: any) {
    if (axios.isCancel(error)) {
      return "";
    }
    if (error.response?.data?.statusCode === 429) {
      toastify({
        type: "error",
        msg: "You have exhausted your API Request Quota",
      });
      return new Error("You have exhausted your API Request Quota");
    }
    if (error?.response?.data?.message === "VALIDATION_ERROR") {
      toastify({
        type: "error",
        msg: error?.response?.data.reason || ERROR_MESSAGE.VALIDATION_ERROR,
      });
    } else if (error?.response?.data?.message === "VALIDATION_DATE_ERROR") {
      toastify({
        type: "error",
        msg: error?.response?.data.error || ERROR_MESSAGE.VALIDATION_ERROR,
      });
    } else if (error.response?.data?.statusCode === 409) {
      toastify({
        type: "error",
        msg: error?.response?.data.message || ERROR_MESSAGE.VALIDATION_ERROR,
      });
    } else if (error?.response) {
      let errMsg = _.get(ERROR_MESSAGE, error.response.data.message);
      if (!errMsg) errMsg = ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
      if (errMsg && !ERROR_MESSAGE_NOT_SHOW_TOAST.includes(errMsg)) {
        toastify({
          type: "error",
          msg: errMsg,
        });
      }

      return error.response.data;
    } else if (error.request) {
      console.error(error.request);
    } else {
      return error.message;
    }
  }
}

const apiServices = new ApiService();
export default apiServices;
