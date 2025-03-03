export interface IAtualizarVeiculo {
  id: number;
  leilaoId?: number;
  tipoVeiculoId?: number;
  placa?: string;
  chassi?: string;
  marca?: string;
  modelo?: string;
  anoFabricacao?: number;
  cor?: string;
  valorMinimo?: number;
  statusPropriedadeId?: number;
  dataRecolhimento: Date;
  motivoRecolhimento?: string;
  clienteArrematanteId?: number;
}
