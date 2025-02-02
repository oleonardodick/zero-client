import { RequisicaoDTO } from '../dtos/requisicao.dto';
import { PastaColecaoDTO } from '../dtos/pastaColecao.dto';

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
  pastas?: PastaColecaoDTO[];
  requisicoes?: RequisicaoDTO[];
};
