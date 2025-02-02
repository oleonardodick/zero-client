import { PastaColecaoDTO } from './pastaColecao.dto';
import { RequisicaoDTO } from './requisicao.dto';

export interface ColecaoDTO {
  id: string;
  nome: string;
  pastas: PastaColecaoDTO[];
  requisicoes: RequisicaoDTO[];
}
