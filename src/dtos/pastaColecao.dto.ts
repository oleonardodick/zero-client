import { RequisicaoDTO } from './requisicao.dto';

export interface PastaColecaoDTO {
  id: string;
  nome: string;
  colecao_id: string;
  requisicoes?: RequisicaoDTO[];
}
