import { AutenticacaoDTO, Basic, Bearer } from './dtos/autenticacao.dto.ts';
import { ColecaoDTO } from './dtos/colecao.dto.ts';
import { HeaderDTO } from './dtos/header.dto.ts';
import { PastaColecaoDTO } from './dtos/pastaColecao.dto.ts';
import { QueryParamDTO } from './dtos/queryParam.dto.ts';
import { RequisicaoDTO } from './dtos/requisicao.dto.ts';
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

      criaRequisicao: (requisicao: RequisicaoDTO) => Promise<CrudResult>;
      atualizaRequisicao: (requisicao: RequisicaoDTO) => Promise<CrudResult>;
      buscaUltimasRequisicoes: () => Promise<RequisicaoDTO[]>;
      buscaRequisicaoPorId: (id: string) => Promise<RequisicaoDTO | null>;
      excluiRequisicao: (id: string) => Promise<CrudResult>;

      criaAutenticacao: (autenticacao: AutenticacaoDTO) => Promise<CrudResult>;
      criaAutenticacaoBasic: (basic: Basic) => Promise<CrudResult>;
      criaAutenticacaoBearer: (bearer: Bearer) => Promise<CrudResult>;

      criaHeader: (headers: HeaderDTO[]) => Promise<CrudResult>;

      criaQueryParam: (params: QueryParamDTO[]) => Promise<CrudResult>;

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
