import axios from "axios";
import { useAuthStore } from "../store/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export const api = axios.create({ baseURL, withCredentials: false });

api.interceptors.request.use((cfg) => {
  const token = useAuthStore.getState().accessToken;
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = useAuthStore.getState().refreshToken;
      if (refresh) {
        try {
          const r = await axios.post(`${baseURL}/auth/refresh`, { refreshToken: refresh });
          useAuthStore.getState().setTokens(r.data.accessToken, r.data.refreshToken);
          err.config.headers.Authorization = `Bearer ${r.data.accessToken}`;
          return axios.request(err.config);
        } catch {
          useAuthStore.getState().logout();
        }
      }
    }
    return Promise.reject(err);
  },
);
