export interface ILeilao {
  id: number;
  tipoLeilaoId: number;
  statusId: number;
  enderecoId: number;
  descricao?: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  urlLeilao?: string;
  usuarioCadastroId: number;
  usuarioAprovacaoId?: number;
  taxaAdministrativa: number;
  valorArrecadado: number;
  dataHoraRegistro: string;
  dataHoraAtualizacao: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  numero: string;
  complemento?: string;
}
