<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ICadastroImovel } from "@/models/dto/ICadastroImovel";
import { apiImovel } from "@/services/Imovel";
import { TYPE, useToast } from "@/plugins/toast";
import { TipoImovel } from "@/models/enum/TipoImovel";
import { StatusPropriedade } from "@/models/enum/StatusPropriedade";

const form = ref();
const appStore = useAppStore();
const imovel = ref<ICadastroImovel>({
  tipoImovelId: TipoImovel.Casa,
  leilaoId: 4,
  areaTotal: 100.0,
  quantidadeComodos: 3,
  valorMinimo: 50000,
  statusPropriedadeId: StatusPropriedade.Disponivel,
  usuarioCadastroId: appStore.Login.id,
  dataRecolhimento: new Date(),
  motivoRecolhimento: "",
  cep: "",
  endereco: "",
  cidade: "",
  estado: "",
  pais: "",
  numero: "",
  complemento: "",
});

const tipoImovel = [
  { text: "Casa", value: TipoImovel.Casa },
  { text: "Apartamento", value: TipoImovel.Apartamento },
  { text: "Terreno", value: TipoImovel.Terreno },
  { text: "Edifício Comercial", value: TipoImovel.EdificioComercial },
  { text: "Espaço Rural", value: TipoImovel.EspacoRural },
  { text: "Industrial", value: TipoImovel.Industrial },
];

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
};

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    try {
      await apiImovel.adicionar(imovel.value);
      useToast("Imóvel cadastrado com sucesso!");
    } catch (error) {
      useToast("Erro ao cadastrar Imóvel", { tipo: TYPE.ERROR });
    }
  }
}

function autoFill() {
  imovel.value = {
    tipoImovelId: TipoImovel.Apartamento,
    leilaoId: 4,
    areaTotal: 120.5,
    quantidadeComodos: 4,
    valorMinimo: 70000,
    statusPropriedadeId: StatusPropriedade.Disponivel,
    usuarioCadastroId: appStore.Login.id,
    dataRecolhimento: new Date(),
    motivoRecolhimento: "Não pagamento do IPTU",
    cep: "12345-678",
    endereco: "Rua Exemplo, 123",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    numero: "123",
    complemento: "Apartamento 101",
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
          label="Tipo de Imóvel"
          v-model="imovel.tipoImovelId"
          :items="tipoImovel"
          item-title="text"
          item-value="value"
        />
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
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-textarea
          label="Motivo do Recolhimento"
          v-model="imovel.motivoRecolhimento"
          :rules="[rules.required]"
        />
      </v-row>

      <v-row justify="space-between" class="w-100">
        <v-text-field label="Cidade" v-model="imovel.cidade" />
        <v-text-field label="Estado" v-model="imovel.estado" />
        <v-text-field label="País" v-model="imovel.pais" />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field label="Endereço" v-model="imovel.endereco" />
        <v-text-field label="Numero" v-model="imovel.numero" />
        <v-text-field label="CEP" v-model="imovel.cep" />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="numero do Leilão vinculado"
          v-model="imovel.leilaoId"
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
