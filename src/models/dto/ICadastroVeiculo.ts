export interface ICadastroVeiculo {
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
  usuarioCadastroId: number;
  dataRecolhimento: Date;
  motivoRecolhimento: string;
}
