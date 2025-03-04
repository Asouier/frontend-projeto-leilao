<script setup>
import FormularioLeilao from "@/components/FormularioLeilao.vue";
import Leiloes from "@/components/Leiloes.vue";
import { Permissao } from "@/models/enum/Permissao";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const foiFeitoLogin = computed(() => appStore.isLoggedIn);
const funcionario = computed(() => Permissao[appStore.Login.permissaoId]);
</script>

<template>
  <div id="Home">
    <v-container>
      <!-- LOGIN -->
      <v-expansion-panels multiple v-if="!foiFeitoLogin">
        <v-expansion-panel>
          <v-expansion-panel-title> Login </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioLogin />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title> Fazer cadastro </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioCliente />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- FUNCIONARIO -->
      <v-expansion-panels
        multiple
        v-if="foiFeitoLogin && funcionario !== undefined"
      >
        <v-expansion-panel>
          <v-expansion-panel-title>
            Cadastro de Funcionarios
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioUsuario />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            Cadastro de Leilões
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioLeilao />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            Cadastro de Cliente
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioCliente />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            Cadastro de Imovel
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioImovel />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            Cadastro de Veiculo
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioVeiculo />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- CLIENTE -->
      <Leiloes v-if="foiFeitoLogin && funcionario === undefined" />
    </v-container>
  </div>
</template>

<style lang="scss"></style>
