export interface IImovel {
  id: number;
  tipoImovelId: number;
  leilaoId: number;
  enderecoId: number;
  areaTotal: number;
  quantidadeComodos?: number;
  valorMinimo: number;
  statusPropriedadeId: number;
  dataHoraCadastro: string;
  usuarioCadastroId: number;
  dataRecolhimento: string;
  motivoRecolhimento: string;
  clienteArrematanteId?: number;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  numero: string;
  complemento?: string;
}
