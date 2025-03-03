import { AxiosCall } from "@/https";
import { IAtualizarUsuario } from "@/models/dto/IAtualizarUsuario";
import { ICadastroUsuario } from "@/models/dto/ICadastroUsuario";

class Usuario extends AxiosCall {
  adicionar<T>(novoUsuario: ICadastroUsuario) {
    return this.axiosCall<T>({
      method: "post",
      url: `/usuario/adicionar`,
      data: novoUsuario,
    });
  }

  atualizar<T>(dadosAtualizados: IAtualizarUsuario) {
    return this.axiosCall<T>({
      method: "put",
      url: `/usuario/atualizar`,
      data: dadosAtualizados,
    });
  }

  remover<T>(id: number) {
    return this.axiosCall<T>({
      method: "delete",
      url: `/usuario/remover/${id}`,
    });
  }

  listarTodos<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/usuario`,
    });
  }

  buscarPorCpf<T>(cpf: string) {
    return this.axiosCall<T>({
      method: "get",
      url: `/usuario/buscar/${cpf}`,
    });
  }

  buscarPorCredencialId<T>(credencialId: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/usuario/registro/${credencialId}`,
    });
  }
}

export const apiUsuario = new Usuario();
