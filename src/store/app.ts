import { IDadosLogin } from "@/models/dto/IDadosLogin";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    Login: {} as IDadosLogin,
  }),
});
