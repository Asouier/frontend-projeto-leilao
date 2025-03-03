export interface IAtualizarCliente {
  id: number;
  credencialId?: number;
  rg?: string;
  orgaoEmissor?: string;
  cpf?: string;
  cnpj?: string;
  nomeCompleto?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  representanteLegalId?: number;
  enderecoId?: number;
  contatoId?: number;
  certidao?: string;
}
