<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { apiLeilao } from "@/services/Leilao";
import { apiVeiculo } from "@/services/Veiculo";
import { apiImovel } from "@/services/Imovel";
import { ILeilao } from "@/models/dto/ILeilao";
import { TipoLeilao } from "@/models/enum/TipoLeilao";
import { IVeiculo } from "@/models/dto/IVeiculo";
import { IImovel } from "@/models/dto/IImovel";
import { INovoLanceImovel } from "@/models/dto/INovoLanceImovel";
import { INovoLanceVeiculo } from "@/models/dto/INovoLanceVeiculo";
import { TipoImovel } from "@/models/enum/TipoImovel";
import { TYPE, useToast } from "@/plugins/toast";

const appStore = useAppStore();
const leiloes = ref<ILeilao[]>([]);
const veiculosPorLeilao = ref<{ [leilaoId: number]: IVeiculo[] }>({});
const imoveisPorLeilao = ref<{ [leilaoId: number]: IImovel[] }>({});
const lanceMinimo = ref<{ [propriedadeId: number]: number }>({});

async function listarLeiloes() {
  try {
    const response = await apiLeilao.listarTodos<ILeilao[]>();
    leiloes.value = response;
  } catch (error) {
    console.error("Erro ao listar leilões", error);
  }
}

async function getPropriedadesLeiloadas(leilaoId: number) {
  try {
    const veiculosLeiloados = await apiVeiculo.buscarPorLeilao(leilaoId);
    const imoveisLeiloados = await apiImovel.buscarPorLeilao(leilaoId);
    veiculosPorLeilao.value[leilaoId] = veiculosLeiloados;
    imoveisPorLeilao.value[leilaoId] = imoveisLeiloados;
    veiculosLeiloados.forEach((veiculo) => {
      lanceMinimo.value[veiculo.id] = veiculo.valorMinimo;
    });

    imoveisLeiloados.forEach((imovel) => {
      lanceMinimo.value[imovel.id] = imovel.valorMinimo;
    });
  } catch (error) {
    console.error("Erro ao listar propriedades leiloadas", error);
  }
}

function formatarData(data: string): string {
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, "0");
  const minuto = String(date.getMinutes()).padStart(2, "0");
  const segundo = String(date.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}

async function novoLanceImovel(
  id: number,
  valor: number,
  valorMinimo: number,
  leilaoId: number
) {
  if (valor < valorMinimo) {
    useToast("O valor de lance deve ser superior ao do último lance", {
      tipo: TYPE.ERROR,
    });
    return;
  }
  const lance: INovoLanceImovel = {
    clienteArrematanteId: appStore.Login.id,
    valorMinimo: valor,
    idImovel: id,
  };
  try {
    await apiImovel.novoLance(lance);
    useToast("Novo lance atribudo");
    const imoveisLeiloados = await apiImovel.buscarPorLeilao(leilaoId);
    imoveisPorLeilao.value = {
      ...imoveisPorLeilao.value,
      [leilaoId]: imoveisLeiloados,
    };
    const imovelAtualizado = imoveisLeiloados.find((v) => v.id === id);
    if (imovelAtualizado) {
      lanceMinimo.value[id] = imovelAtualizado.valorMinimo;
    }
  } catch (error) {
    console.error("Erro ao dar o lance", error);
  }
}

async function novoLanceVeiculo(
  id: number,
  valor: number,
  valorMinimo: number,
  leilaoId: number
) {
  if (valor < valorMinimo) {
    useToast("O valor de lance deve ser superior ao do último lance", {
      tipo: TYPE.ERROR,
    });
    return;
  }
  const lance: INovoLanceVeiculo = {
    clienteArrematanteId: appStore.Login.id,
    valorMinimo: valor,
    idVeiculo: id,
  };
  try {
    await apiVeiculo.novoLance(lance);
    useToast("Novo lance atribudo");
    const veiculosLeiloados = await apiVeiculo.buscarPorLeilao(leilaoId);
    veiculosPorLeilao.value = {
      ...veiculosPorLeilao.value,
      [leilaoId]: veiculosLeiloados,
    };

    const veiculoAtualizado = veiculosLeiloados.find((v) => v.id === id);
    if (veiculoAtualizado) {
      lanceMinimo.value[id] = veiculoAtualizado.valorMinimo;
    }
  } catch (error) {
    console.error("Erro ao dar o lance", error);
  }
}

onMounted(() => {
  listarLeiloes();
});
</script>
<template>
  <v-container>
    <div class="loopLeiloes" v-for="leilao in leiloes" :key="leilao.id">
      <div class="tituloLeilao d-flex">
        <h3>Leilão #{{ leilao.id }} - {{ TipoLeilao[leilao.tipoLeilaoId] }}</h3>
        <h3>Encerramento: {{ formatarData(leilao.dataHoraFim) }}</h3>
      </div>
      <div
        class="propriedade veiculos"
        v-for="veiculo in veiculosPorLeilao[leilao.id]"
      >
        <div class="informacoes">
          <span>
            Veículo #{{ veiculo.id }} - Valor Mínimo: R$
            {{ veiculo.valorMinimo }}
          </span>
          <span>
            Motivo de Recolhimento: {{ veiculo.motivoRecolhimento }}
          </span>
        </div>
      </div>
      <div
        class="propriedade imoveis"
        v-for="imovel in imoveisPorLeilao[leilao.id]"
      >
        <div class="informacoes">
          <p>Imóvel #{{ imovel.id }}</p>
          <p>Área total: {{ imovel.areaTotal }}</p>
          <p>Tipo do imóvel: {{ TipoImovel[imovel.tipoImovelId] }}</p>
          <p>Valor Mínimo: R$ {{ imovel.valorMinimo }}</p>
          <p>Motivo de Recolhimento: {{ imovel.motivoRecolhimento }}</p>
        </div>
        <div class="lances">
          <div class="valores">
            <p>{{ imovel.valorMinimo }}</p>
            <p>{{ lanceMinimo[imovel.id] }}</p>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss">
.tituloAcordeao {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.propriedade {
  * {
    font-size: 1.6rem;
  }
  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 1.4rem;
    }
  }
  .conteudo {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    flex-direction: row;
    align-items: center;
    transition: all ease-in-out 0.25s;
    &:nth-child(2) {
      border-top: none !important;
      border-bottom: 1px solid #d1d1d1d1;
    }
    &:nth-child(odd) {
      border-top: 1px solid #d1d1d1d1;
      border-bottom: 1px solid #d1d1d1d1;
      background: #fbfbfb;
    }
    &:last-child {
      border-top: 1px solid #d1d1d1d1;
      border-bottom: none;
    }
    &:hover {
      & .lances {
        opacity: 1;
      }
    }
    .lances {
      flex-direction: row;
      transition: all ease-in-out 0.25s;
      opacity: 0.3;
      .valores {
        text-align: center;
        flex-direction: column;
        width: 190px;
        padding-right: 20px;
        span.proximoLance {
          font-size: 2rem !important;
        }
      }
      .historico {
        text-align: center;
        & li {
          list-style: none;
        }
      }
    }
  }
}
</style>
