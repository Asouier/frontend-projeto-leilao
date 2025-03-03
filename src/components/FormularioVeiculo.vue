<script setup lang="ts">
import { ref } from "vue";
import { ICadastroVeiculo } from "@/models/dto/ICadastroVeiculo";
import { apiVeiculo } from "@/services/Veiculo";

const form = ref();
const veiculo = ref<ICadastroVeiculo>({
  leilaoId: 1,
  tipoVeiculoId: 1,
  placa: "",
  chassi: "",
  marca: "",
  modelo: "",
  anoFabricacao: new Date().getFullYear(),
  cor: "",
  valorMinimo: 10000,
  statusPropriedadeId: 1,
  usuarioCadastroId: 1,
  dataRecolhimento: new Date(),
  motivoRecolhimento: "",
});

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    apiVeiculo.adicionar(veiculo.value).then((res) => {
      console.log("Veículo cadastrado:", res);
    });
  }
}
function autoFill() {
  veiculo.value = {
    leilaoId: 2,
    tipoVeiculoId: 3,
    placa: "ABC-1234",
    chassi: "9BWZZZ377VT004251",
    marca: "Toyota",
    modelo: "Corolla",
    anoFabricacao: 2022,
    cor: "Prata",
    valorMinimo: 80000,
    statusPropriedadeId: 1,
    usuarioCadastroId: 5,
    dataRecolhimento: new Date(),
    motivoRecolhimento: "Venda judicial",
  };
}
function resetForm() {
  form.value.reset();
}
</script>

<template>
  <v-container>
    <v-form ref="form">
      <v-text-field label="Placa" v-model="veiculo.placa" />
      <v-text-field label="Marca" v-model="veiculo.marca" />
      <v-text-field label="Modelo" v-model="veiculo.modelo" />
      <v-text-field
        label="Ano de Fabricação"
        v-model="veiculo.anoFabricacao"
        type="number"
      />
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
