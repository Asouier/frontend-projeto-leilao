import { AxiosCall } from "@/https";
import { IAtualizarVeiculo } from "@/models/dto/IAtualizarVeiculo";
import { ICadastroVeiculo } from "@/models/dto/ICadastroVeiculo";
import { INovoLanceVeiculo } from "@/models/dto/INovoLanceVeiculo";

class VeiculoService extends AxiosCall {
  adicionar<T>(novoVeiculo: ICadastroVeiculo) {
    return this.axiosCall<T>({
      method: "post",
      url: `/veiculo/adicionar`,
      data: novoVeiculo,
    });
  }

  atualizar<T>(novosDados: IAtualizarVeiculo) {
    return this.axiosCall<T>({
      method: "put",
      url: `/veiculo/atualizar`,
      data: novosDados,
    });
  }

  novoLance<T>(novoLance: INovoLanceVeiculo) {
    return this.axiosCall<T>({
      method: "put",
      url: `/veiculo/novoLance`,
      data: novoLance,
    });
  }

  remover<T>(id: number) {
    return this.axiosCall<T>({
      method: "delete",
      url: `/veiculo/remover/${id}`,
    });
  }

  buscarPorId<T>(id: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/veiculo/numero/${id}`,
    });
  }

  listarTodos<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/veiculo`,
    });
  }

  buscarPorLeilao<T>(leilaoId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/veiculo/filtrar-por-leilao/${leilaoId}`,
    });
  }

  buscarPorStatus<T>(statusId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/veiculo/status/${statusId}`,
    });
  }
}

export const apiVeiculo = new VeiculoService();
