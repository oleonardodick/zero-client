import { AutenticacaoDTO, Basic, Bearer } from './dtos/autenticacao.dto.ts';
import { ColecaoDTO } from './dtos/colecao.dto.ts';
import { HeaderDTO } from './dtos/header.dto.ts';
import { PastaColecaoDTO } from './dtos/pastaColecao.dto.ts';
import { QueryParamDTO } from './dtos/queryParam.dto.ts';
import { CriaRequisicaoDTO, RequisicaoDTO } from './dtos/requisicao.dto.ts';
import { RespostaDTO } from './dtos/resposta.dto.ts';
import { VariavelAmbienteDTO } from './dtos/variavelAmbiente.dto.ts';
import { CrudResult, ResultExportImport } from './shared/types';

declare global {
  interface Window {
    electron: {
      exportarJson: (
        dadosJSON: object,
        nomeArquivo: string
      ) => Promise<ResultExportImport>;
      importarJson: () => Promise<ResultExportImport>;

      buscaTodasVariaveisAmbiente: () => Promise<VariavelAmbienteDTO[]>;
      criaVariavelAmbiente: (
        nome: string,
        valor: string
      ) => Promise<CrudResult>;
      atualizaVariavelAmbiente: (
        nome: string,
        valor: string
      ) => Promise<CrudResult>;
      excluiVariavelAmbiente: (nome: string) => Promise<CrudResult>;

      criaRequisicao: (requisicao: CriaRequisicaoDTO) => Promise<CrudResult>;
      atualizaRequisicao: (
        requisicao: CriaRequisicaoDTO,
        id: string
      ) => Promise<CrudResult>;
      buscaUltimasRequisicoes: () => Promise<RequisicaoDTO[]>;
      buscaRequisicaoPorId: (id: string) => Promise<RequisicaoDTO | null>;
      buscaRequisicoesColecao: (colecao_id: string) => Promise<RequisicaoDTO[]>;
      buscaRequisicoesPasta: (pasta_id: string) => Promise<RequisicaoDTO[]>;
      excluiRequisicao: (id: string) => Promise<CrudResult>;

      buscaAutenticacaoDaRequisicao: (
        requisicao_id: string
      ) => Promise<AutenticacaoDTO | null>;
      criaAutenticacao: (autenticacao: AutenticacaoDTO) => Promise<CrudResult>;
      criaAutenticacaoBasic: (basic: Basic) => Promise<CrudResult>;
      criaAutenticacaoBearer: (bearer: Bearer) => Promise<CrudResult>;

      buscaHeadersDaRequisicao: (requisicao_id: string) => Promise<HeaderDTO[]>;
      criaHeader: (headers: HeaderDTO[]) => Promise<CrudResult>;

      buscaQueryParamsDaRequisicao: (
        id_requisicao: string
      ) => Promise<QueryParamDTO[]>;
      criaQueryParam: (params: QueryParamDTO[]) => Promise<CrudResult>;

      buscaRespostaDaRequisicao: (
        requisicao_id: string
      ) => Promise<RespostaDTO | null>;
      criaResposta: (
        resposta: RespostaDTO,
        requisicao_id: string
      ) => Promise<CrudResult>;
      atualizaResposta: (
        resposta: RespostaDTO,
        requisicao_id: string
      ) => Promise<CrudResult>;

      buscaColecoes: () => Promise<ColecaoDTO[]>;
      criaColecao: (colecao: ColecaoDTO) => Promise<CrudResult>;
      atualizaColecao: (colecao: ColecaoDTO) => Promise<CrudResult>;
      excluiColecao: (id: string) => Promise<CrudResult>;

      buscaPastasColecao: (colecao_id: string) => Promise<PastaColecaoDTO[]>;
      criaPastaColecao: (pasta: PastaColecaoDTO) => Promise<CrudResult>;
      atualizaPastaColecao: (pasta: PastaColecaoDTO) => Promise<CrudResult>;
      excluiPastaColecao: (id: string) => Promise<CrudResult>;
    };
  }
}
