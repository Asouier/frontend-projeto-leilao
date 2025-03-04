import { IAuthAPI } from "@/models/dto/IAuth";
import axios from "axios";

//const urlBase = import.meta.env.VITE_API_URL;
const urlBase = "http://localhost:5000/api"; //temporário

const TOKEN_STORAGE_KEY = "authToken";
const TOKEN_TIMESTAMP_KEY = "tokenTimestamp";
const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000;

export const obterTokenApi = async (): Promise<IAuthAPI> => {
  let novoAccessToken: IAuthAPI = {
    token: "",
  };

  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  const storedTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);

  if (storedToken && storedTimestamp) {
    const currentTime = new Date().getTime();
    const tokenTimestamp = parseInt(storedTimestamp, 10);

    if (currentTime - tokenTimestamp < TOKEN_EXPIRATION_TIME) {
      novoAccessToken.token = storedToken;
      return novoAccessToken;
    }
  }

  await axios
    .get(`${urlBase}/credencial/tokenparateste/desenvolvimento`)
    .then((response) => {
      novoAccessToken = response.data as IAuthAPI;

      localStorage.setItem(TOKEN_STORAGE_KEY, novoAccessToken.token);
      localStorage.setItem(
        TOKEN_TIMESTAMP_KEY,
        new Date().getTime().toString()
      );
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    });

  return novoAccessToken;
};
