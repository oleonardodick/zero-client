import { RequisicaoDTO } from './dtos/requisicao.dto.ts';
import { RespostaDTO } from './dtos/resposta.dto.ts';
import { VariavelAmbienteDTO } from './dtos/variavelAmbiente.dto.ts';
import { CrudResult } from './shared/types';

declare global {
  interface Window {
    electron: {
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
      criaResposta: (
        resposta: RespostaDTO,
        requisicao_id: string
      ) => Promise<CrudResult>;
    };
  }
}
