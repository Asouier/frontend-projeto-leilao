export interface IVeiculo {
  id: number;
  leilaoId: number;
  tipoVeiculoId: number;
  placa: string;
  chassi: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor: string;
  valorMinimo: number;
  statusPropriedadeId: number;
  dataHoraCadastro: string;
  usuarioCadastroId: number;
  dataRecolhimento: string;
  motivoRecolhimento: string;
  clienteArrematanteId?: number;
}
