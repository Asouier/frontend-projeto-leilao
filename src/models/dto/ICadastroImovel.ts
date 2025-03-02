export interface ICadastroImovel {
  tipoImovelId: number;
  leilaoId: number;
  enderecoId: number;
  areaTotal: number;
  quantidadeComodos?: number;
  valorMinimo: number;
  statusPropriedadeId: number;
  usuarioCadastroId: number;
  dataRecolhimento: Date;
  motivoRecolhimento: string;
}
