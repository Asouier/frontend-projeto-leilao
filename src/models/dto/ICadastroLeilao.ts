export interface ICadastroLeilao {
  tipoLeilaoId: number;
  statusId: number;
  enderecoId?: number;
  dataHoraInicio: string;
  dataHoraFim: string;
  urlLeilao?: string;
  usuarioCadastroId: number;
  usuarioAprovacaoId?: number;
  taxaAdministrativa: number;
  cep?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  numero?: string;
  complemento?: string;
}
