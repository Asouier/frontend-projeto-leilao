export interface IDadosLogin {
  id: number;
  nomeUsuario: string;
  nomeCompleto?: string;
  nomeFantasia?: string;
  cidade?: string;
  email: string;
  cargoFuncao?: string;
  permissaoId?: number;
  regiaoResponsavel?: string;
  categoriaResponsavel?: string;
}
