import { AxiosCall } from "@/https";

class Endereco extends AxiosCall {
  buscarPorId<T>(id: number) {
    return this.axiosCall<T>({
      method: "get",
      url: `/endereco/numero/${id}`,
    });
  }
}

export const apiEndereco = new Endereco();
