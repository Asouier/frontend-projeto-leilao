export interface ICadastroImovel {
  tipoImovelId: number;
  leilaoId: number;
  areaTotal: number;
  quantidadeComodos?: number;
  valorMinimo: number;
  statusPropriedadeId: number;
  usuarioCadastroId: number;
  dataRecolhimento: Date;
  motivoRecolhimento: string;
  cep?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  numero?: string;
  complemento?: string;
}
