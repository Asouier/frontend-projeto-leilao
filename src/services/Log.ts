import { AxiosCall } from "@/https";
import { ILog } from "@/models/dto/ILog";

class logService extends AxiosCall {
  buscarPorId(leilaoId: number, entidadeId: number) {
    return this.axiosCall<ILog[]>({
      method: "get",
      url: `log/leilao/${leilaoId}/propriedade/${entidadeId}`,
    });
  }
}

export const apiLog = new logService();
