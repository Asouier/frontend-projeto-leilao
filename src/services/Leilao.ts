import { AxiosCall } from "@/https";
import { IAtualizarLeilao } from "@/models/dto/IAtualizarLeilao";
import { ICadastroLeilao } from "@/models/dto/ICadastroLeilao";

class Leilao extends AxiosCall {
  adicionar(novoLeilao: ICadastroLeilao) {
    return this.axiosCall<string>({
      method: "post",
      url: `/leilao/adicionar`,
      data: novoLeilao,
    });
  }

  atualizar<T>(dadosAtualizados: IAtualizarLeilao) {
    return this.axiosCall<T>({
      method: "put",
      url: `/leilao/atualizar`,
      data: dadosAtualizados,
    });
  }

  buscarPorId<T>(id: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/leilao/numero/${id}`,
    });
  }

  listarTodos<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/leilao`,
    });
  }

  buscarPorStatus<T>(statusId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/leilao/status/${statusId}`,
    });
  }

  buscarPorTipoLeilao<T>(tipoLeilaoId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/leilao/tipo/${tipoLeilaoId}`,
    });
  }
}

export const apiLeilao = new Leilao();
