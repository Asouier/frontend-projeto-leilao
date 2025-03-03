<script setup>
import { Permissao } from "@/models/enum/Permissao";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const foiFeitoLogin = computed(() => appStore.isLoggedIn);
</script>

<template>
  <div id="Home">
    <v-container>
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
      <v-expansion-panels multiple v-if="foiFeitoLogin">
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
    </v-container>
  </div>
</template>

<style lang="scss">
button.v-expansion-panel-title {
  font-size: 15px;
  max-height: 48px;
  transition: all ease-in-out 0.25s;
  &:hover,
  &.v-expansion-panel-title--active {
    font-size: 18px;
  }
}
label.v-label.v-field-label {
  font-size: 14px;
}
</style>
