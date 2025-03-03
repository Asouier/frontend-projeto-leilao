<script setup lang="ts">
import { ILogin } from "@/models/dto/ILogin";
import { apiCredencial } from "@/services/Credencial";
import { useAppStore } from "@/store/app";
import { ref } from "vue";

const appStore = useAppStore();
const form = ref();
const loginData = ref<ILogin>({
  nomeUsuario: "",
  senha: "",
});

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

async function login() {
  const { valid } = await form.value.validate();
  if (valid) {
    apiCredencial.acessar(loginData.value).then((res) => {
      appStore.setLogin(res.resultado);
      appStore.token = res.token;
    });
  }
}

function autoFill(perfil: number) {
  if (perfil == 1) {
    loginData.value = {
      nomeUsuario: "loja.maria",
      senha: "Loja123456Maria",
    };
  } else {
    loginData.value = {
      nomeUsuario: "administrador",
      senha: "Adm12345@2025",
    };
  }
}

function resetForm() {
  form.value.reset();
}
</script>

<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        label="Login"
        v-model="loginData.nomeUsuario"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Senha"
        v-model="loginData.senha"
        type="password"
        :rules="[rules.required, rules.minLength(6)]"
      />
      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-center"> AutoPreencher </v-col>
      </v-row>

      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-start">
          <v-btn color="primary" @click="login">Entrar</v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn class="mr-2" color="secondary" @click="autoFill(1)">
            Cliente
          </v-btn>
          <v-btn color="secondary" @click="autoFill(2)"> Administrador </v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="secondary" @click="resetForm">Resetar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
