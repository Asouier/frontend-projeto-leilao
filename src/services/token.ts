import { IAuthAPI } from "@/models/auth";
import axios from "axios";

const apiURL = process.env.VUE_APP_API_URL;
const secret = process.env.VUE_APP_AZUREAD_SECRET;
const clientId = process.env.VUE_APP_AZUREAD_CLIENTID;
const scope = encodeURIComponent(process.env.VUE_APP_AZUREAD_SCOPE as string);

export const obterTokenApi = async () => {
  let novoAccessToken: IAuthAPI = {
    accessToken: "",
    expiresIn: 0,
  };

  await axios
    .get(
      `${apiURL}/api/v1/token?Scope=${scope}&ClientId=${clientId}&Secret=${secret}`
    )
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
