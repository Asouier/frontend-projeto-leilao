import { AxiosCall } from "@/https";
import { IAtualizarImovel } from "@/models/dto/IAtualizarImovel";
import { ICadastroImovel } from "@/models/dto/ICadastroImovel";
import { INovoLanceImovel } from "@/models/dto/INovoLanceImovel";

class Imovel extends AxiosCall {
  adicionar<T>(novoImovel: ICadastroImovel) {
    return this.axiosCall<T>({
      method: "post",
      url: `/imovel/adicionar`,
      data: novoImovel,
    });
  }

  atualizar<T>(novosDados: IAtualizarImovel) {
    return this.axiosCall<T>({
      method: "put",
      url: `/imovel/atualizar`,
      data: novosDados,
    });
  }

  novoLance<T>(novoLance: INovoLanceImovel) {
    return this.axiosCall<T>({
      method: "put",
      url: `/imovel/novoLance`,
      data: novoLance,
    });
  }

  remover<T>(id: number) {
    return this.axiosCall<T>({
      method: "delete",
      url: `/imovel/remover/${id}`,
    });
  }

  buscarPorId<T>(id: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/imovel/numero/${id}`,
    });
  }

  listarTodos<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/imovel`,
    });
  }

  buscarPorLeilao<T>(leilaoId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/imovel/filtrar-por-leilao/${leilaoId}`,
    });
  }

  buscarPorStatus<T>(statusId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/imovel/status/${statusId}`,
    });
  }
}

export const apiImovel = new Imovel();
