<script setup lang="ts">
import { ref } from "vue";

const form = ref();
const loginData = ref({
  login: "",
  senha: "",
});

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

// Emulando submit
async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    alert("Login realizado com sucesso!");
    console.log("Dados de login:", loginData.value);
  }
}

function autoFill(perfil: number) {
  if (perfil == 1) {
    loginData.value = {
      login: "representante.loja.maria",

      senha: "123456",
    };
  } else {
    loginData.value = {
      login: "administrador",
      senha: "123456789",
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
        v-model="loginData.login"
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
          <v-btn color="primary" @click="submitForm">Entrar</v-btn>
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
