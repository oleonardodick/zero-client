export type IVariavelAmbiente = {
  nome: string;
  valor: string;
};

export type CrudResult = {
  sucesso: boolean;
  erro?: string;
  idCriado?: string;
};

export type Resposta = {
  idRequisicao: string;
  jsonRetorno: string;
  status: number;
  statusText: string;
  size: number;
  time: number;
};
