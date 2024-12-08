export type IVariavelAmbiente = {
  nome: string;
  valor: string;
};

export type CrudResult = {
  sucesso: boolean;
  erro?: string;
};

export type IQueryParams = {
  selecionado: boolean;
  query: string;
  valor: string;
};

export type IHeaders = {
  selecionado: boolean;
  header: string;
  valor: string;
};
