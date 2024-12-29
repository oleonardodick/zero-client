import { CrudResult, IVariavelAmbiente, Requisicao } from './shared/types';

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
      criaRequisicao: (requisicao: Requisicao) => Promise<CrudResult>;
    };
  }
}
