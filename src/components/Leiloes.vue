<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { apiLeilao } from "@/services/Leilao";
import { apiVeiculo } from "@/services/Veiculo";
import { apiImovel } from "@/services/Imovel";
import { apiEndereco } from "@/services/Endereco";
import { apiLog } from "@/services/Log";
import { ILeilao } from "@/models/dto/ILeilao";
import { TipoLeilao } from "@/models/enum/TipoLeilao";
import { IVeiculo } from "@/models/dto/IVeiculo";
import { IImovel } from "@/models/dto/IImovel";
import { ILog } from "@/models/dto/ILog";
import { INovoLanceImovel } from "@/models/dto/INovoLanceImovel";
import { INovoLanceVeiculo } from "@/models/dto/INovoLanceVeiculo";
import { TipoImovel } from "@/models/enum/TipoImovel";
import { TYPE, useToast } from "@/plugins/toast";

onMounted(() => {
  listarLeiloes();
});

const appStore = useAppStore();
const leiloes = ref<ILeilao[]>([]);
const veiculosPorLeilao = ref<{ [leilaoId: number]: IVeiculo[] }>({});
const imoveisPorLeilao = ref<{ [leilaoId: number]: IImovel[] }>({});
const lanceMinimoVeiculos = ref<{ [veiculoId: number]: number }>({});
const lanceMinimoImoveis = ref<{ [imovelId: number]: number }>({});
const historicoLances = ref<{ [lances: number]: ILog[] }>({});

async function listarLeiloes() {
  try {
    const response = await apiLeilao.listarTodos<ILeilao[]>();
    leiloes.value = response;

    const leiloesPresenciais = response.filter(
      (leilao) => leilao.tipoLeilaoId === TipoLeilao.Presencial
    );

    await Promise.all(
      leiloesPresenciais.map(async (leilao) => {
        try {
          const endereco = await apiEndereco.buscarPorId(leilao.enderecoId);
          Object.assign(leilao, endereco);
        } catch (error) {
          console.error(
            `Erro ao buscar endereço para leilão ${leilao.id}`,
            error
          );
        }
      })
    );
  } catch (error) {
    console.error("Erro ao listar leilões", error);
  }
}

async function getHistoricoLances(leilaoId: number, propriedadeId: number) {
  try {
    const response = await apiLog.buscarPorId(leilaoId, propriedadeId);
    historicoLances.value[propriedadeId] = response;
  } catch (error) {
    console.error(
      `Erro ao buscar histórico de lances para propriedade ${propriedadeId}`,
      error
    );
  }
}
function extrairEFormatarNumero(texto: string): string | null {
  const match = texto.match(/(?:\((?:R\$)?([\d.,]+)\)|(?:R\$)?([\d.,]+))/);
  if (!match) return null;
  const numeroStr = match[1] || match[2];
  const numero = parseFloat(numeroStr.replace(/\./g, "").replace(",", "."));
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function getPropriedadesLeiloadas(leilaoId: number) {
  try {
    const veiculosLeiloados = await apiVeiculo.buscarPorLeilao(leilaoId);
    const imoveisLeiloados = await apiImovel.buscarPorLeilao(leilaoId);
    veiculosPorLeilao.value[leilaoId] = veiculosLeiloados;
    imoveisPorLeilao.value[leilaoId] = imoveisLeiloados;

    // Atualiza os valores mínimos dos veículos
    for (const veiculo of veiculosLeiloados) {
      lanceMinimoVeiculos.value[veiculo.id] = veiculo.valorMinimo + 200;
      await getHistoricoLances(leilaoId, veiculo.id);
    }

    // Atualiza os valores mínimos dos imóveis
    for (const imovel of imoveisLeiloados) {
      lanceMinimoImoveis.value[imovel.id] = imovel.valorMinimo + 200;
      await getHistoricoLances(leilaoId, imovel.id);
    }
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
    useToast("Novo lance atribuído");

    const imoveisLeiloados = await apiImovel.buscarPorLeilao(leilaoId);
    imoveisPorLeilao.value = {
      ...imoveisPorLeilao.value,
      [leilaoId]: imoveisLeiloados,
    };

    const imovelAtualizado = imoveisLeiloados.find((v) => v.id === id);
    if (imovelAtualizado) {
      lanceMinimoImoveis.value[id] = imovelAtualizado.valorMinimo + 200;
    }

    await getHistoricoLances(leilaoId, id);
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
    useToast("Novo lance atribuído");

    const veiculosLeiloados = await apiVeiculo.buscarPorLeilao(leilaoId);
    veiculosPorLeilao.value = {
      ...veiculosPorLeilao.value,
      [leilaoId]: veiculosLeiloados,
    };

    const veiculoAtualizado = veiculosLeiloados.find((v) => v.id === id);
    if (veiculoAtualizado) {
      lanceMinimoVeiculos.value[id] = veiculoAtualizado.valorMinimo + 200;
    }

    await getHistoricoLances(leilaoId, id);
  } catch (error) {
    console.error("Erro ao dar o lance", error);
  }
}

function prazoDeEncerramento(dataHoraFim: string): boolean {
  const dataFim = new Date(dataHoraFim);
  const dataAtual = new Date();
  return dataFim < dataAtual;
}
</script>
<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="(leilao, index) in leiloes"
      :key="index"
      :disabled="prazoDeEncerramento(leilao.dataHoraFim)"
    >
      <v-expansion-panel-title @click="getPropriedadesLeiloadas(leilao.id)">
        <div class="tituloAcordeao">
          <span>
            Leilão #{{ leilao.id }}{{ leilao.tipoLeilaoId }} -
            {{ TipoLeilao[leilao.tipoLeilaoId] }}
          </span>
          <span>Encerramento: {{ formatarData(leilao.dataHoraFim) }}</span>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div
          class="propriedade text-center"
          v-if="leilao.tipoLeilaoId === TipoLeilao.Presencial"
        >
          <h3>Esse leilão está disponível apenas presencialmente</h3>
          <div class="informacoes">
            <span> Endereço: {{ leilao.descricao }} </span>
            <span> Cep: {{ leilao.cep }} </span>
            <span> cidade: {{ leilao.cidade }} </span>
            <span> estado: {{ leilao.estado }} </span>
            <span> {{ leilao.complemento ? leilao.complemento : "" }} </span>
          </div>
        </div>
        <div
          class="propriedade veiculo"
          v-if="veiculosPorLeilao[leilao.id]?.length"
        >
          <h3>Veículos Leiloados</h3>
          <div
            class="conteudo"
            v-for="veiculo in veiculosPorLeilao[leilao.id]"
            :key="veiculo.id"
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
            <div
              class="lances"
              v-if="leilao.tipoLeilaoId !== TipoLeilao.Presencial"
            >
              <div class="valores">
                <h4>Lance Mínimo</h4>
                <span class="proximoLance">
                  {{
                    extrairEFormatarNumero(
                      lanceMinimoVeiculos[veiculo.id].toString()
                    )
                  }}
                </span>
                <v-btn
                  color="primary"
                  @click="
                    novoLanceVeiculo(
                      veiculo.id,
                      lanceMinimoVeiculos[veiculo.id] || 0,
                      veiculo.valorMinimo,
                      leilao.id
                    )
                  "
                >
                  Dar Lance
                </v-btn>
                {{
                  veiculo.clienteArrematanteId == appStore.Login.id
                    ? "O último lance foi seu"
                    : ""
                }}
              </div>
              <div class="historico">
                <h4>Último lance</h4>
                <ul v-if="historicoLances[veiculo.id]?.length">
                  <li
                    v-for="(lance, index) in historicoLances[veiculo.id]
                      .slice(-4)
                      .reverse()"
                    :key="index"
                  >
                    R$ {{ extrairEFormatarNumero(lance.acao) }}
                  </li>
                </ul>
                <p v-else>Nenhum lance registrado.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Exibe os imóveis leiloados -->
        <div
          class="propriedade imovel"
          v-if="imoveisPorLeilao[leilao.id]?.length"
        >
          <h3>Imóveis Leiloados</h3>
          <div
            class="conteudo"
            v-for="imovel in imoveisPorLeilao[leilao.id]"
            :key="imovel.id"
          >
            <div class="informacoes">
              <span> Imóvel #{{ imovel.id }} </span>
              <span> Área total: {{ imovel.areaTotal }} </span>
              <span>
                Tipo do imóvel: {{ TipoImovel[imovel.tipoImovelId] }}
              </span>
              <span> Valor Mínimo: R$ {{ imovel.valorMinimo }} </span>
              <span>
                Motivo de Recolhimento: {{ imovel.motivoRecolhimento }}
              </span>
            </div>
            <div class="lances">
              <div class="valores">
                <h4>Lance Mínimo</h4>
                <span class="proximoLance">
                  <span class="proximoLance">
                    {{
                      extrairEFormatarNumero(
                        lanceMinimoImoveis[imovel.id].toString()
                      )
                    }}
                  </span>
                </span>
                <v-btn
                  color="primary"
                  @click="
                    novoLanceImovel(
                      imovel.id,
                      lanceMinimoImoveis[imovel.id] || 0,
                      imovel.valorMinimo,
                      leilao.id
                    )
                  "
                >
                  Dar Lance
                </v-btn>
              </div>
              <div class="historico">
                <h4>Último lance</h4>
                <ul v-if="historicoLances[imovel.id]?.length">
                  <li
                    v-for="(lance, index) in historicoLances[imovel.id]
                      .slice(-4)
                      .reverse()"
                    :key="index"
                  >
                    R$ {{ extrairEFormatarNumero(lance.acao) }}
                  </li>
                </ul>
                <p v-else>Nenhum lance registrado.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensagem se não houver propriedades leiloadas -->
        <div
          v-if="
            !veiculosPorLeilao[leilao.id]?.length &&
            !imoveisPorLeilao[leilao.id]?.length
          "
        >
          Nenhuma propriedade leiloada encontrada.
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
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
