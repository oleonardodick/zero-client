import { AutenticacaoDTO } from '@/dtos/autenticacao.dto';
import { create } from 'zustand';
import { BuscaAutenticacaoDaRequisicao } from '../services/autenticacao.service';
import { v4 as uuidv4 } from 'uuid';

type AutenticacaoStore = {
  autenticacao: AutenticacaoDTO;
  setAutenticacao: (autenticacao: Partial<AutenticacaoDTO>) => void;
  isLoading: boolean;
  requisicaoPosicionada: string;
  fetchAutenticacao: (requisicao_id: string) => Promise<void>;
};

export const useAutenticacaoStore = create<AutenticacaoStore>((set, get) => ({
  autenticacao: {
    id: '',
    tipo: 'none',
    requisicao_id: '',
  },
  isLoading: false,
  requisicaoPosicionada: '',
  fetchAutenticacao: async (requisicao_id: string) => {
    if (get().requisicaoPosicionada === requisicao_id) return;
    set({ isLoading: true });
    set({ requisicaoPosicionada: requisicao_id });
    try {
      const autenticacaoBuscada = await BuscaAutenticacaoDaRequisicao(
        requisicao_id
      );
      set({
        autenticacao: autenticacaoBuscada
          ? autenticacaoBuscada
          : { id: uuidv4(), tipo: 'none', requisicao_id: requisicao_id },
        isLoading: false,
      });
    } catch (error) {
      console.log('Erro na busca: ', error);
      set({ isLoading: false });
    }
  },
  setAutenticacao: (autenticacao) => {
    set((state) => ({
      autenticacao: { ...state.autenticacao, ...autenticacao },
    }));
  },

  // setTipo: (tipo: string) =>
  //   set((state) => ({
  //     autenticacao: {
  //       ...state.autenticacao,
  //       tipo: tipo,
  //       bearer: tipo === 'bearer' ? state.autenticacao.bearer : null,
  //       basic: tipo === 'basic' ? state.autenticacao.basic : null,
  //     },
  //   })),
  // setBasic: (basic: Basic) =>
  //   set((state) => ({
  //     autenticacao: {
  //       ...state.autenticacao,
  //       basic: basic,
  //       bearer: null,
  //     },
  //   })),
  // setBearer: (bearer: Bearer) =>
  //   set((state) => ({
  //     autenticacao: {
  //       ...state.autenticacao,
  //       basic: null,
  //       bearer: bearer,
  //     },
  //   })),
}));
