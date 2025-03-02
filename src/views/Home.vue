<script setup>
import { Permissao } from "@/models/enum/Permissao";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
const info = useAppStore();
const foiFeitoLogin = computed(() => info.login != undefined);
console.log(info.Login);
</script>

<template>
  <div id="Home">
    <Header></Header>
    <v-container>
      <v-expansion-panels multiple>
        <v-expansion-panel v-if="!foiFeitoLogin">
          <v-expansion-panel-title> Login </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioLogin />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="foiFeitoLogin">
          <v-expansion-panel-title>
            Cadastro de Funcionarios
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioUsuario />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            {{ foiFeitoLogin ? "Cadastro de Cliente" : "Fazer cadastro" }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioCliente />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="foiFeitoLogin">
          <v-expansion-panel-title>
            Cadastro de Imovel
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <FormularioImovel />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="foiFeitoLogin">
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
  &:hover {
    font-size: 18px;
  }
}
label.v-label.v-field-label {
  font-size: 14px;
}
</style>
