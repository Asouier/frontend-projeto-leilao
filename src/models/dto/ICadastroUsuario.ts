export interface ICadastroUsuario {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  cargoFuncao: string;
  entidadeResponsavel: string;
  usuario: string;
  senha: string;
  email: string;
  telefone: string;
  permissaoId?: number;
  usuarioConcessaoId?: number;
  regiaoResponsavel?: string;
  categoriaResponsavel: string;
}
