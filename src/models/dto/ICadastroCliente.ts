export interface ICadastroCliente {
  credencialId?: number;
  rg?: string;
  orgaoEmissor?: string;
  cpf?: string;
  cnpj?: string;
  nomeCompleto?: string;
  nomeFantasia?: string;
  nomeUsuario: string;
  senha: string;
  razaoSocial?: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  numero: string;
  complemento?: string;
  email: string;
  telefone: string;
  certidao?: string;
}
