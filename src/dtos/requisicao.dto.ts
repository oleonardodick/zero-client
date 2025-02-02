import { AutenticacaoDTO } from './autenticacao.dto';
import { HeaderDTO } from './header.dto';
import { QueryParamDTO } from './queryParam.dto';
import { RespostaDTO } from './resposta.dto';

export interface RequisicaoDTO {
  id?: string;
  url: string;
  tipo: string;
  jsonEnvio: string;
  nome: string;
  data?: Date;
  query_params?: QueryParamDTO[];
  headers?: HeaderDTO[];
  autenticacao?: AutenticacaoDTO | null;
  resposta?: RespostaDTO | null;
  colecao_id?: string;
}
