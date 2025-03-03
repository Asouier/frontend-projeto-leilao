export interface IAtualizarLeilao {
  id: number;
  tipoLeilaoId?: number;
  statusId?: number;
  enderecoId?: number;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  urlLeilao?: string;
  usuarioAprovacaoId?: number;
  taxaAdministrativa?: number;
}
