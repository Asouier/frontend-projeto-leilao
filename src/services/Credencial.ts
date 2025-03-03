import { AxiosCall } from "@/https";
import { ILogin } from "@/models/dto/ILogin";
import { IAtualizarCredencial } from "@/models/dto/IAtualizarCredencial";
import { ILoginResponse } from "@/models/dto/ILoginResponse";

class Credencial extends AxiosCall {
  obterToken<T>() {
    return this.axiosCall<T>({
      method: "get",
      url: `/credencial/tokenParaTeste/desenvolvimento`,
    });
  }

  acessar(credencial: ILogin) {
    return this.axiosCall<ILoginResponse>({
      method: "post",
      url: `/credencial/acesso`,
      data: credencial,
    });
  }

  atualizar<T>(novosDados: IAtualizarCredencial) {
    return this.axiosCall<T>({
      method: "put",
      url: `/credencial/atualizar`,
      data: novosDados,
    });
  }

  buscarPorNomeUsuario<T>(nomeUsuario: string) {
    return this.axiosCall<T>({
      method: "get",
      url: `/credencial/filtrar-por-nome-usuario/${nomeUsuario}`,
    });
  }
}

export const apiCredencial = new Credencial();
