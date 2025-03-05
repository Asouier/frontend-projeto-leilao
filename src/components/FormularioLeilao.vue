<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ICadastroLeilao } from "@/models/dto/ICadastroLeilao";
import { apiLeilao } from "@/services/Leilao";
import { TYPE, useToast } from "@/plugins/toast";
import { StatusLeilao } from "@/models/enum/StatusLeilao";
import { TipoLeilao } from "@/models/enum/TipoLeilao";

const form = ref();
const appStore = useAppStore();
const ultimoCadastro = ref("");
const leilao = ref<ICadastroLeilao>({
  tipoLeilaoId: TipoLeilao.Presencial,
  statusId: StatusLeilao.Ativo,
  dataHoraInicio: "",
  dataHoraFim: "",
  urlLeilao: "",
  usuarioCadastroId: appStore.Login.id,
  usuarioAprovacaoId: appStore.Login.id,
  taxaAdministrativa: 0,
  entidadeFinanceira: "",
  incrementoLance: 0,
  cep: "",
  endereco: "",
  cidade: "",
  estado: "",
  pais: "",
  numero: "",
  complemento: "",
});

const statusLeilao = [
  { text: "Ativo", value: StatusLeilao.Ativo },
  { text: "Finalizado", value: StatusLeilao.Finalizado },
  { text: "Cancelado", value: StatusLeilao.Cancelado },
  { text: "Suspenso", value: StatusLeilao.Suspenso },
];
const tipoLeilao = [
  { text: "Remoto", value: TipoLeilao.Remoto },
  { text: "Presencial", value: TipoLeilao.Presencial },
];

async function submitForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    try {
      if (leilao.value.tipoLeilaoId == TipoLeilao.Remoto) {
        leilao.value.cep = "";
        leilao.value.endereco = "";
        leilao.value.cidade = "";
        leilao.value.estado = "";
        leilao.value.pais = "";
        leilao.value.numero = "";
        leilao.value.complemento = "";
      } else {
        leilao.value.urlLeilao = "";
      }
      const data = await apiLeilao.adicionar(leilao.value);
      ultimoCadastro.value = data;
      useToast(`Leilão numero ${data} foi cadastrado com sucesso!`);
    } catch (error) {
      useToast("Erro ao cadastrar Leilão", { tipo: TYPE.ERROR });
    }
  }
}
function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 16); // Converte para "YYYY-MM-DDTHH:mm"
}

function autoFill() {
  leilao.value = {
    tipoLeilaoId: TipoLeilao.Presencial,
    statusId: StatusLeilao.Ativo,
    dataHoraInicio: formatDateTime(new Date()),
    dataHoraFim: formatDateTime(new Date(Date.now() + 360000000)),
    urlLeilao: "https://www.exemplo.com/leilao",
    usuarioCadastroId: appStore.Login.id,
    usuarioAprovacaoId: appStore.Login.id,
    taxaAdministrativa: 5.5,
    entidadeFinanceira: "07.786.304/0001-75",
    incrementoLance: 500,
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
          label="Tipo de Leilao"
          v-model="leilao.tipoLeilaoId"
          :items="tipoLeilao"
          item-title="text"
          item-value="value"
        />
        <v-select
          label="Status Leilao"
          v-model="leilao.statusId"
          :items="statusLeilao"
          item-title="text"
          item-value="value"
        />
      </v-row>
      <v-row
        v-if="leilao.tipoLeilaoId == TipoLeilao.Remoto"
        justify="space-between"
        class="w-100"
      >
        <v-text-field label="URL do Leilão" v-model="leilao.urlLeilao" />
      </v-row>
      <v-row
        v-if="leilao.tipoLeilaoId == TipoLeilao.Presencial"
        justify="space-between"
        class="w-100"
      >
        <v-text-field label="Cidade" v-model="leilao.cidade" />
        <v-text-field label="Estado" v-model="leilao.estado" />
        <v-text-field label="País" v-model="leilao.pais" />
      </v-row>
      <v-row
        v-if="leilao.tipoLeilaoId == TipoLeilao.Presencial"
        justify="space-between"
        class="w-100"
      >
        <v-text-field label="Endereço" v-model="leilao.endereco" />
        <v-text-field label="Numero" v-model="leilao.numero" />
        <v-text-field label="CEP" v-model="leilao.cep" />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Taxa Administrativa (%)"
          v-model="leilao.taxaAdministrativa"
          type="number"
        />
        <v-text-field
          label="Incremento de lances (R$)"
          v-model="leilao.incrementoLance"
          type="number"
        />
        <v-text-field
          label="CNPJ entidade financeira"
          v-model="leilao.entidadeFinanceira"
        />
      </v-row>
      <v-row justify="space-between" class="w-100">
        <v-text-field
          label="Data e Hora de Início"
          v-model="leilao.dataHoraInicio"
          type="datetime-local"
        />
        <v-text-field
          label="Data e Hora de Fim"
          v-model="leilao.dataHoraFim"
          type="datetime-local"
        />
      </v-row>

      {{ ultimoCadastro ? "Último leilão cadastrado:" + ultimoCadastro : "" }}

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
