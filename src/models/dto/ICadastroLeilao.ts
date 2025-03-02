export interface ICadastroLeilao {
  tipoLeilaoId: number;
  statusId: number;
  enderecoId?: number;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  urlLeilao?: string;
  usuarioCadastroId: number;
  usuarioAprovacaoId?: number;
  taxaAdministrativa: number;
}
