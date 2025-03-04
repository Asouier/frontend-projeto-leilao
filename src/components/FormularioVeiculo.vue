<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ICadastroVeiculo } from "@/models/dto/ICadastroVeiculo";
import { apiVeiculo } from "@/services/Veiculo";
import { TYPE, useToast } from "@/plugins/toast";
import { TipoVeiculo } from "@/models/enum/TipoVeiculo";
import { StatusPropriedade } from "@/models/enum/StatusPropriedade";

const appStore = useAppStore();
const form = ref();
const veiculo = ref<ICadastroVeiculo>({
  leilaoId: 6,
  tipoVeiculoId: TipoVeiculo.Carro,
  placa: "",
  chassi: "",
  marca: "",
  modelo: "",
  anoFabricacao: new Date().getFullYear(),
  cor: "",
  valorMinimo: 10000,
  statusPropriedadeId: StatusPropriedade.Disponivel,
  usuarioCadastroId: appStore.Login.id,
  dataRecolhimento: new Date(),
  motivoRecolhimento: "",
});

const tipoVeiculo = [
  { text: "Motocicleta", value: TipoVeiculo.Motocicleta },
  { text: "Carro", value: TipoVeiculo.Carro },
  { text: "Van", value: TipoVeiculo.Van },
  { text: "Ônibus", value: TipoVeiculo.Onibus },
  { text: "Caminhão", value: TipoVeiculo.Caminhao },
];

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    try {
      await apiVeiculo.adicionar(veiculo.value);
      useToast("Veículo cadastrado com sucesso!");
    } catch (error) {
      useToast("Erro ao cadastrar Veículo", { tipo: TYPE.ERROR });
    }
  }
}
function autoFill() {
  veiculo.value = {
    leilaoId: 6,
    tipoVeiculoId: TipoVeiculo.Motocicleta,
    placa: "ABC-1234",
    chassi: "9BWZZZ377VT004251",
    marca: "Toyota",
    modelo: "Corolla",
    anoFabricacao: 2022,
    cor: "Prata",
    valorMinimo: 80000,
    statusPropriedadeId: StatusPropriedade.Disponivel,
    usuarioCadastroId: appStore.Login.id,
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
      <v-row justify="space-between" class="w-100">
        <v-select
          label="Tipo de veículo"
          v-model="veiculo.tipoVeiculoId"
          :items="tipoVeiculo"
          item-title="text"
          item-value="value"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field label="Placa" v-model="veiculo.placa" />
        <v-text-field label="Chassi" v-model="veiculo.chassi" />
        <v-text-field label="Marca" v-model="veiculo.marca" />
        <v-text-field label="Modelo" v-model="veiculo.modelo" />
        <v-text-field label="Cor" v-model="veiculo.cor" />
        <v-text-field
          label="Ano de Fabricação"
          v-model="veiculo.anoFabricacao"
          type="number"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-textarea
          label="Motivo do Recolhimento"
          v-model="veiculo.motivoRecolhimento"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="numero do Leilão vinculado"
          v-model="veiculo.leilaoId"
          type="number"
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
