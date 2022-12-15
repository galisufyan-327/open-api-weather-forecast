import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
api.interceptors.request.use((config) => {
  config.params["appid"] = process.env.REACT_APP_API_KEY;

  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (!axios.isCancel(error)) {
    console.group("API error group");
    console.error("API error: ", { error });
    console.error("API error response: ", error.response);
    console.groupEnd();
  }

  return Promise.reject(error);
});

export default api;
