<script setup lang="ts">
import { ICadastroUsuario } from "@/models/dto/ICadastroUsuario";
import { apiUsuario } from "@/services/Usuario";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { TYPE, useToast } from "@/plugins/toast";

const appStore = useAppStore();
const form = ref();
const usuario = ref<ICadastroUsuario>({
  nomeCompleto: "",
  cpf: "",
  rg: "",
  cargoFuncao: "",
  entidadeResponsavel: "",
  usuario: "",
  senha: "",
  email: "",
  telefone: "",
  permissaoId: undefined,
  usuarioConcessaoId: undefined,
  regiaoResponsavel: "",
  categoriaResponsavel: "Todas",
});

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
  minLength: (length: number) => (v: string) =>
    (v && v.length >= length) || `Mínimo ${length} caracteres`,
};

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    usuario.value.usuarioConcessaoId = appStore.Login.id;
    try {
      await apiUsuario.adicionar(usuario.value);
      useToast("Novo Funcionario adicionado!");
    } catch (error) {
      useToast("Erro ao cadastrar novo Usuário", { tipo: TYPE.ERROR });
    }
  }
}
function autoFill() {
  usuario.value = {
    nomeCompleto: "João Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    cargoFuncao: "Gerente",
    entidadeResponsavel: "Empresa XYZ",
    usuario: "joaosilva",
    senha: "senha123",
    email: "joao@email.com",
    telefone: "(11) 91234-5678",
    permissaoId: 2,
    usuarioConcessaoId: 1,
    regiaoResponsavel: "Sudeste",
    categoriaResponsavel: "Financeiro",
  };
}

function resetForm() {
  form.value.reset();
}
</script>

<template>
  <v-container>
    <v-form ref="form">
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Nome Completo"
          v-model="usuario.nomeCompleto"
          :rules="[rules.required]"
        />
        <v-text-field
          label="CPF"
          v-model="usuario.cpf"
          :rules="[rules.required, rules.minLength(11)]"
        />
        <v-text-field label="RG" v-model="usuario.rg" />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Cargo/Função"
          v-model="usuario.cargoFuncao"
          :rules="[rules.required]"
        />
        <v-text-field
          label="Entidade Responsável"
          v-model="usuario.entidadeResponsavel"
          :rules="[rules.required]"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Usuário"
          v-model="usuario.usuario"
          :rules="[rules.required]"
        />
        <v-text-field
          label="Senha"
          v-model="usuario.senha"
          type="password"
          :rules="[rules.required, rules.minLength(6)]"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="E-mail"
          v-model="usuario.email"
          :rules="[rules.required, rules.email]"
        />
        <v-text-field
          label="Telefone"
          v-model="usuario.telefone"
          :rules="[rules.required]"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="ID Permissão"
          v-model="usuario.permissaoId"
          type="number"
          :rules="[rules.required]"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Região Responsável"
          v-model="usuario.regiaoResponsavel"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-select
          label="Categoria Responsável"
          v-model="usuario.categoriaResponsavel"
          :items="['Todas', 'Imóveis', 'Veículos', 'Outros']"
        />
      </v-row>
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
</template>
