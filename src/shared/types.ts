export type IVariavelAmbiente = {
  nome: string;
  valor: string;
};

export type CrudResult = {
  sucesso: boolean;
  erro?: string;
};

export type QueryParam = {
  id: string;
  selecionado: boolean;
  query: string;
  valor: string;
};

export type Header = {
  id: string;
  selecionado: boolean;
  header: string;
  valor: string;
};

export type Autenticacao = {
  tipo: string;
  bearer?: Bearer;
  basic?: Basic;
};

export type Bearer = {
  token?: string;
  prefix?: string;
};

export type Basic = {
  usuario?: string;
  senha?: string;
};

export type Requisicao = {
  id: string;
  url: string;
  tipo: string;
  jsonEnvio: string;
  jsonRetorno: string;
  data: string;
  queryParams: QueryParam[] | [];
  header: Header[] | [];
  autenticacao?: Autenticacao;
};
