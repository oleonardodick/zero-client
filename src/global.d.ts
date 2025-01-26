import { ColecaoDTO } from './dtos/colecao.dto.ts';
import { PastaColecaoDTO } from './dtos/pastaColecao.dto.ts';
import { RequisicaoDTO } from './dtos/requisicao.dto.ts';
import { RespostaDTO } from './dtos/resposta.dto.ts';
import { VariavelAmbienteDTO } from './dtos/variavelAmbiente.dto.ts';
import { CrudResult } from './shared/types';

declare global {
  interface Window {
    electron: {
      salvarJson: (
        dadosJSON: object,
        nomeArquivo: string
      ) => {
        success: boolean;
        error?: string;
        filePath?: string;
      };
      importarJson: () => {
        success: boolean;
        json?: ColecaoDTO[] | PastaColecaoDTO;
        error?: string;
        filePath?: string;
      };

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
