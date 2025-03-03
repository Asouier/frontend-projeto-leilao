<script setup lang="ts">
import { ref } from "vue";
import { ICadastroImovel } from "@/models/dto/ICadastroImovel";
import { apiImovel } from "@/services/Imovel";

const form = ref();
const imovel = ref<ICadastroImovel>({
  tipoImovelId: 1,
  leilaoId: 1,
  enderecoId: 1,
  areaTotal: 100.0,
  quantidadeComodos: 3,
  valorMinimo: 50000,
  statusPropriedadeId: 1,
  usuarioCadastroId: 1,
  dataRecolhimento: new Date(),
  motivoRecolhimento: "",
});

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
};

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    apiImovel.adicionar(imovel.value).then(() => {
      alert("Formulário enviado com sucesso!");
    });
  }
}
function autoFill() {
  imovel.value = {
    tipoImovelId: 2,
    leilaoId: 3,
    enderecoId: 5,
    areaTotal: 120.5,
    quantidadeComodos: 4,
    valorMinimo: 70000,
    statusPropriedadeId: 2,
    usuarioCadastroId: 10,
    dataRecolhimento: new Date(),
    motivoRecolhimento: "Venda por leilão",
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
        label="Área Total"
        v-model="imovel.areaTotal"
        type="number"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Quantidade de Cômodos"
        v-model="imovel.quantidadeComodos"
        type="number"
      />
      <v-text-field
        label="Valor Mínimo"
        v-model="imovel.valorMinimo"
        type="number"
      />
      <v-textarea
        label="Motivo do Recolhimento"
        v-model="imovel.motivoRecolhimento"
        :rules="[rules.required]"
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
