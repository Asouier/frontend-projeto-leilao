<template>
  <v-app-bar color="primary" density="compact">
    <v-container class="d-flex align-center">
      <v-avatar class="mr-3">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>

      <div class="info-container">
        <div v-if="infoLoginStore.nomeUsuario">
          <strong>Usuário:</strong> {{ infoLoginStore.nomeUsuario }}
        </div>
        <div v-if="infoLoginStore.nomeCompleto">
          <strong>Nome:</strong> {{ infoLoginStore.nomeCompleto }}
        </div>
        <div v-if="infoLoginStore.nomeFantasia">
          <strong>Nome Fantasia:</strong> {{ infoLoginStore.nomeFantasia }}
        </div>
        <div v-if="infoLoginStore.cidade">
          <strong>Cidade:</strong> {{ infoLoginStore.cidade }}
        </div>
        <div v-if="infoLoginStore.email">
          <strong>Email:</strong> {{ infoLoginStore.email }}
        </div>
        <div v-if="infoLoginStore.cargoFuncao">
          <strong>Cargo:</strong> {{ infoLoginStore.cargoFuncao }}
        </div>
        <div v-if="infoLoginStore.permissaoId">
          <strong>Permissão ID:</strong> {{ infoLoginStore.permissaoId }}
        </div>
        <div v-if="infoLoginStore.regiaoResponsavel">
          <strong>Região Responsável:</strong>
          {{ infoLoginStore.regiaoResponsavel }}
        </div>
        <div v-if="infoLoginStore.categoriaResponsavel">
          <strong>Categoria Responsável:</strong>
          {{ infoLoginStore.categoriaResponsavel }}
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" icon @click="logout" variant="outlined">
        Sair
      </v-btn>

      <v-btn v-else icon @click="login" variant="outlined"> Entrar </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { useRouter } from "vue-router";

const infoLoginStore = useAppStore();
const router = useRouter();

const isLoggedIn = computed(() => !!infoLoginStore.nomeUsuario);

const logout = () => {
  infoLoginStore.$reset();
  router.push("/login");
};

const login = () => {
  router.push("/login");
};
</script>

<style scoped>
.info-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
