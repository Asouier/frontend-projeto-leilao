<script setup lang="ts">
import { ILogin } from "@/models/dto/ILogin";
import { apiCredencial } from "@/services/Credencial";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { TYPE, useToast } from "@/plugins/toast";

const appStore = useAppStore();
const form = ref();
const loginData = ref<ILogin>({
  nomeUsuario: "",
  senha: "",
});

const loading = ref(false);

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

async function login() {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;

    try {
      const data = await apiCredencial.acessar(loginData.value);
      appStore.setLogin(data.resultado);
      appStore.token = data.token;
    } catch (error) {
      useToast("Usuário e senha não são compativeis", { tipo: TYPE.ERROR });
    } finally {
      loading.value = false;
    }
  }
}

function autoFill(perfil: number) {
  if (perfil == 1) {
    loginData.value = {
      nomeUsuario: "carlos.tech",
      senha: "segredo456",
    };
  } else if (perfil == 2) {
    loginData.value = {
      nomeUsuario: "adm.joaosilva",
      senha: "AdmSenha123",
    };
  } else {
    loginData.value = {
      nomeUsuario: "anasouza",
      senha: "senha789",
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
        :disabled="loading"
      />
      <v-text-field
        label="Senha"
        v-model="loginData.senha"
        type="password"
        :rules="[rules.required, rules.minLength(6)]"
        :disabled="loading"
      />
      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-center"> AutoPreencher </v-col>
      </v-row>

      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-start">
          <v-btn color="primary" @click="login" :disabled="loading">
            Entrar
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn
            class="mr-2"
            color="secondary"
            @click="autoFill(1)"
            :disabled="loading"
          >
            Cliente 1
          </v-btn>
          <v-btn
            class="mr-2"
            color="secondary"
            @click="autoFill(2)"
            :disabled="loading"
          >
            Administrador
          </v-btn>
          <v-btn
            class="mr-2"
            color="secondary"
            @click="autoFill(3)"
            :disabled="loading"
          >
            Cliente 2
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="secondary" @click="resetForm" :disabled="loading"
            >Resetar</v-btn
          >
        </v-col>
      </v-row>

      <v-row justify="center" v-if="loading">
        <v-col class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
