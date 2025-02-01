import { AutenticacaoDTO } from './autenticacao.dto';
import { HeaderDTO } from './header.dto';
import { QueryParamDTO } from './queryParam.dto';
import { RespostaDTO } from './resposta.dto';

// export class RequisicaoDTO {
//   id?: string;
//   url: string;
//   tipo: string;
//   jsonEnvio: string;
//   nome: string;
//   data?: Date;
//   query_params?: QueryParamDTO[];
//   headers?: HeaderDTO[];
//   autenticacao?: AutenticacaoDTO | null;
//   resposta?: RespostaDTO | null;

//   constructor(
//     url: string,
//     tipo: string,
//     jsonEnvio: string,
//     nome: string,
//     data?: Date,
//     query_params?: QueryParamDTO[],
//     headers?: HeaderDTO[],
//     autenticacao?: AutenticacaoDTO | null,
//     id?: string,
//     resposta?: RespostaDTO | null
//   ) {
//     this.id = id;
//     this.url = url;
//     this.tipo = tipo;
//     this.jsonEnvio = jsonEnvio;
//     this.data = data;
//     this.query_params = query_params;
//     this.headers = headers;
//     this.autenticacao = autenticacao;
//     this.nome = nome;
//     this.resposta = resposta;
//   }
// }

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
}
