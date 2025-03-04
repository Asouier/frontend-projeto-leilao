export interface ILog {
  id: number;
  usuarioId?: number | null;
  clienteId?: number | null;
  leilaoId?: number | null;
  entidade: string;
  entidadeId: number;
  dataHora: string;
  acao: string;
}
