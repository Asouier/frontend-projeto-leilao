<template>
  <v-app-bar color="primary" density="compact">
    <v-container class="d-flex align-center">
      <v-avatar class="mr-3">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>

      <div class="info-container">
        <div v-if="appStore.Login.nomeUsuario">
          <strong>Usuário:</strong> {{ appStore.Login.nomeUsuario }}
        </div>
        <div v-if="appStore.Login.nomeCompleto">
          <strong>Nome:</strong> {{ appStore.Login.nomeCompleto }}
        </div>
        <div v-if="appStore.Login.nomeFantasia">
          <strong>Nome Fantasia:</strong> {{ appStore.Login.nomeFantasia }}
        </div>
        <div v-if="appStore.Login.cidade">
          <strong>Cidade:</strong> {{ appStore.Login.cidade }}
        </div>
        <div v-if="appStore.Login.email">
          <strong>Email:</strong> {{ appStore.Login.email }}
        </div>
        <div v-if="appStore.Login.cargoFuncao">
          <strong>Cargo:</strong> {{ appStore.Login.cargoFuncao }}
        </div>
        <div v-if="appStore.Login.permissaoId">
          <strong>Permissão:</strong>
          {{ Permissao[appStore.Login.permissaoId] }}
        </div>
        <div v-if="appStore.Login.regiaoResponsavel">
          <strong>Região Responsável:</strong>
          {{ appStore.Login.regiaoResponsavel }}
        </div>
        <div v-if="appStore.Login.categoriaResponsavel">
          <strong>Categoria Responsável:</strong>
          {{ appStore.Login.categoriaResponsavel }}
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!loginStatus" icon @click="logout" variant="outlined">
        Sair
      </v-btn>

      <v-btn v-else icon @click="login" variant="outlined"> Entrar </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { Permissao } from "@/models/enum/Permissao";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const router = useRouter();

const loginStatus = computed(() => appStore.loginStatus);

const logout = () => {
  appStore.clearLogin();
  appStore.token = "";
};

const login = () => {
  // adicionar rota no futuro
};
</script>

<style scoped>
.info-container {
  display: flex;
  flex-direction: row;
  gap: 3.4rem;
  font-size: 1.5rem;
}
</style>
