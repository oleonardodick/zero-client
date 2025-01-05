export type IVariavelAmbiente = {
  nome: string;
  valor: string;
};

export type CrudResult = {
  sucesso: boolean;
  erro?: string;
};

// export type QueryParam = {
//   selecionado: boolean;
//   query: string;
//   valor: string;
//   id: string;
// };

// export type Header = {
//   selecionado: boolean;
//   header: string;
//   valor: string;
//   id: string;
// };

// export type Autenticacao = {
//   tipo: string;
//   bearer?: Bearer;
//   basic?: Basic;
// };

// export type Bearer = {
//   token?: string;
//   prefix?: string;
// };

// export type Basic = {
//   usuario?: string;
//   senha?: string;
// };

// export type Requisicao = {
//   id: string;
//   url: string;
//   tipo: string;
//   jsonEnvio: string;
//   queryParams: QueryParam[] | [];
//   header: Header[] | [];
//   autenticacao?: Autenticacao;
// };

export type Resposta = {
  idRequisicao: string;
  jsonRetorno: string;
  status: number;
  statusText: string;
  size: number;
  time: number;
};
