export type CrudResult = {
  sucesso: boolean;
  erro?: string;
  idCriado?: string;
};

export type ResultExportImport = {
  sucesso: boolean;
  erro?: string;
};

export type Resposta = {
  idRequisicao: string;
  jsonRetorno: string;
  status: number;
  statusText: string;
  size: number;
  time: number;
};

export type JsonColecao = {
  nome: string;
  id: string;
  client: string;
  pastas?: JsonPastas[];
};

export type JsonPastas = {
  id: string;
  nome: string;
};
