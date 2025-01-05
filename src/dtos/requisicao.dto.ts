import { AutenticacaoDTO } from './autenticacao.dto';
import { HeaderDTO } from './header.dto';
import { QueryParamDTO } from './queryParam.dto';

export class RequisicaoDTO {
  id?: string;
  url: string;
  tipo: string;
  jsonEnvio: string;
  data?: Date;
  query_params?: QueryParamDTO[];
  headers?: HeaderDTO[];
  autenticacao?: AutenticacaoDTO | null;
  nome?: string | null;

  constructor(
    url: string,
    tipo: string,
    jsonEnvio: string,
    data?: Date,
    query_params?: QueryParamDTO[],
    headers?: HeaderDTO[],
    autenticacao?: AutenticacaoDTO | null,
    id?: string,
    nome?: string
  ) {
    this.id = id;
    this.url = url;
    this.tipo = tipo;
    this.jsonEnvio = jsonEnvio;
    this.data = data;
    this.query_params = query_params;
    this.headers = headers;
    this.autenticacao = autenticacao;
    this.nome = nome;
  }
}
