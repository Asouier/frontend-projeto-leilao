import { IAuthAPI } from "@/models/dto/IAuth";
import axios from "axios";

const urlBase = import.meta.env.VITE_API_URL;
//const urlBase = "http://backend:5000/api"; //temporário

export const obterTokenApi = async () => {
  let novoAccessToken: IAuthAPI = {
    token: "",
  };

  await axios
    .get(`${urlBase}/credencial/tokenparateste/desenvolvimento`)
    .then((response) => {
      novoAccessToken = response.data as IAuthAPI;
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
