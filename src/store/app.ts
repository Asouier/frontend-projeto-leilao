import { IDadosLogin } from "@/models/dto/IDadosLogin";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    Login: {} as IDadosLogin,
    token: "",
  }),
  actions: {
    setLogin(data: IDadosLogin) {
      this.Login = data;
    },
    clearLogin() {
      this.Login = {} as IDadosLogin;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.Login.nomeUsuario,
  },
});
