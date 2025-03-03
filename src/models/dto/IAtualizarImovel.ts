export interface IAtualizarImovel {
  id: number;
  tipoImovelId?: number;
  leilaoId?: number;
  enderecoId?: number;
  areaTotal?: number;
  quantidadeComodos?: number;
  valorMinimo?: number;
  statusPropriedadeId?: number;
  dataRecolhimento: Date;
  motivoRecolhimento?: string;
  clienteArrematanteId?: number;
}
