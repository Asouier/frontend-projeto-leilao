<script setup lang="ts">
import { ref } from "vue";
import { ICadastroCliente } from "@/models/dto/ICadastroCliente";
import { apiCliente } from "@/services/Cliente";
import { TYPE, useToast } from "@/plugins/toast";

const form = ref();
const cliente = ref<ICadastroCliente>({
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

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    try {
      await apiCliente.cadastrar(cliente.value);
      useToast("Novo Cliente adicionado!");
    } catch (error) {
      useToast("Erro ao cadastrar novo Cliente", { tipo: TYPE.ERROR });
    }
  }
}
function autoFill() {
  cliente.value = {
    rg: "55.667.889-0",
    orgaoEmissor: "SSP",
    cpf: "556.678.899-00",
    cnpj: "55.667.889/0001-44",
    nomeCompleto: "Fernando Alves",
    nomeFantasia: "Alves Soluções",
    nomeUsuario: "fernandoa",
    senha: "minhaSenha321",
    razaoSocial: "Fernando Alves ME",
    cep: "45678-901",
    endereco: "Rua do Comércio, 321",
    cidade: "Curitiba",
    estado: "PR",
    pais: "Brasil",
    numero: "321",
    complemento: "Andar 2",
    email: "fernando@email.com",
    telefone: "(41) 96543-2109",
    certidao: "Cert321",
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
      <v-text-field label="Razão Social" v-model="cliente.razaoSocial" />
      <v-text-field label="CPF" v-model="cliente.cpf" />
      <v-text-field label="CNPJ" v-model="cliente.cnpj" />
      <v-text-field label="Órgão emissor" v-model="cliente.orgaoEmissor" />
      <v-text-field label="E-mail" v-model="cliente.email" />
      <v-text-field label="Telefone" v-model="cliente.telefone" />
      <v-text-field label="Nome de usuário" v-model="cliente.nomeUsuario" />
      <v-text-field label="Senha" v-model="cliente.senha" />
      <v-text-field label="CEP" v-model="cliente.cep" />
      <v-text-field label="Endereço" v-model="cliente.endereco" />
      <v-text-field label="Numero" v-model="cliente.numero" />
      <v-text-field label="Cidade" v-model="cliente.cidade" />
      <v-text-field label="Estado" v-model="cliente.estado" />
      <v-text-field label="País" v-model="cliente.pais" />
      <v-text-field label="Complemento" v-model="cliente.complemento" />
      <v-text-field
        label="Certidão casamento/nascimento"
        v-model="cliente.certidao"
      />
      <v-row justify="space-between" class="w-100">
        <v-col class="d-flex justify-start">
          <v-btn color="primary" @click="submitForm">Cadastrar</v-btn>
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
  <div class="Imoveis"></div>
</template>
