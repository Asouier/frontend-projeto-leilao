<script setup lang="ts">
import { ref } from "vue";
import { ICadastroCliente } from "@/models/dto/ICadastroCliente";

const form = ref();
const cliente = ref<ICadastroCliente>({
  credencialId: undefined,
  rg: "",
  orgaoEmissor: "",
  cpf: "",
  cnpj: "",
  nomeCompleto: "",
  nomeFantasia: "",
  nomeUsuario: "",
  senha: "",
  razaoSocial: "",
  cep: "",
  endereco: "",
  cidade: "",
  estado: "",
  pais: "",
  numero: "",
  complemento: "",
  email: "",
  telefone: "",
  certidao: "",
});

// Regras de validação
const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

// Funções do formulário
async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) alert("Formulário enviado com sucesso!");
}
function autoFill() {
  cliente.value = {
    credencialId: 1,
    rg: "12.345.678-9",
    orgaoEmissor: "SSP",
    cpf: "123.456.789-00",
    cnpj: "12.345.678/0001-00",
    nomeCompleto: "Maria Oliveira",
    nomeFantasia: "Loja Maria",
    nomeUsuario: "maria123",
    senha: "senha123",
    razaoSocial: "Maria Oliveira ME",
    cep: "12345-678",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    numero: "123",
    complemento: "Apto 45",
    email: "maria@email.com",
    telefone: "(11) 91234-5678",
    certidao: "Cert123",
  };
}
function resetForm() {
  form.value.reset();
}
</script>

<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        label="Nome Completo"
        v-model="cliente.nomeCompleto"
        :rules="[rules.required]"
      />
      <v-text-field label="Nome Fantasia" v-model="cliente.nomeFantasia" />
      <v-text-field label="CPF" v-model="cliente.cpf" />
      <v-text-field label="CNPJ" v-model="cliente.cnpj" />
      <v-text-field label="E-mail" v-model="cliente.email" />
      <v-text-field label="Telefone" v-model="cliente.telefone" />
      <v-text-field label="Endereço" v-model="cliente.endereco" />
      <v-text-field label="Cidade" v-model="cliente.cidade" />
      <v-text-field label="Estado" v-model="cliente.estado" />
      <v-text-field label="País" v-model="cliente.pais" />
      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-start">
          <v-btn color="primary" @click="submitForm">Entrar</v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn color="secondary" @click="autoFill">AutoPreencher</v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn color="secondary" @click="resetForm">Resetar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
