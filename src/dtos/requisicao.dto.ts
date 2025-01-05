import { AutenticacaoDTO } from './autenticacao.dto';
import { HeaderDTO } from './header.dto';
import { QueryParamDTO } from './queryParam.dto';

export class RequisicaoDTO {
  id?: string;
  url: string;
  tipo: string;
  jsonEnvio: string;
  data?: Date;
  queryParams?: QueryParamDTO[];
  headers?: HeaderDTO[];
  autenticacao?: AutenticacaoDTO;

  constructor(
    url: string,
    tipo: string,
    jsonEnvio: string,
    data?: Date,
    queryParams?: QueryParamDTO[],
    headers?: HeaderDTO[],
    autenticacao?: AutenticacaoDTO,
    id?: string
  ) {
    this.id = id;
    this.url = url;
    this.tipo = tipo;
    this.jsonEnvio = jsonEnvio;
    this.data = data;
    this.queryParams = queryParams;
    this.headers = headers;
    this.autenticacao = autenticacao;
  }
}
