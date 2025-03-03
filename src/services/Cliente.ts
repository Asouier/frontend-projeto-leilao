import { AxiosCall } from "@/https";
import { IAtualizarCliente } from "@/models/dto/IAtualizarCliente";
import { ICadastroCliente } from "@/models/dto/ICadastroCliente";

class Cliente extends AxiosCall {
  cadastrar<T>(novoCliente: ICadastroCliente) {
    return this.axiosCall<T>({
      method: "post",
      url: `/cliente/adicionar`,
      data: novoCliente,
    });
  }
  atualizar<T>(novosDados: IAtualizarCliente) {
    return this.axiosCall<T>({
      method: "put",
      url: `/cliente/atualizar`,
      data: novosDados,
    });
  }

  remover<T>(id: number) {
    return this.axiosCall<T>({
      method: "delete",
      url: `/cliente/remover/${id}`,
    });
  }

  buscarPorId<T>(id: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/cliente/numero/${id}`,
    });
  }

  listarTodos<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/cliente`,
    });
  }

  buscarPorNome<T>(nome: string) {
    return this.axiosCall<T>({
      method: "get",
      url: `/cliente/filtrar-por-nome/${nome}`,
    });
  }

  buscarPorCpf<T>(cpf: string) {
    return this.axiosCall<T>({
      method: "get",
      url: `/cliente/cpf/${cpf}`,
    });
  }

  buscarPorCnpj<T>(cnpj: string) {
    return this.axiosCall<T>({
      method: "get",
      url: `/cliente/cnpj/${cnpj}`,
    });
  }
}

export const apiCliente = new Cliente();
