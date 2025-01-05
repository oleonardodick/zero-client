import { RequisicaoDTO } from './dtos/requisicao.dto.ts';
import { CrudResult, IVariavelAmbiente } from './shared/types';

declare global {
  interface Window {
    electron: {
      buscaTodasVariaveisAmbiente: () => Promise<IVariavelAmbiente[]>;
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
      buscaUltimasRequisicoes: () => Promise<RequisicaoDTO[]>;
    };
  }
}
