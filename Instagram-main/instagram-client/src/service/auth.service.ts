import apiServices from "./api.service";
import { setToken, getRefreshToken } from "./storage.service";
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  const res = await apiServices.post("/auth/refresh-token", {
    refreshToken,
  });
  const { accessToken } = res.data.data ;
  setToken(accessToken);
  return { accessToken };
};