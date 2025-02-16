import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { create } from 'zustand';
import { TipoRequisicao } from '../enums/tipoRequisicao.enum';
import { BuscaRequisicaoPorId } from '../services/requisicao.service';

type RequisicaoStore = {
  requisicao: RequisicaoDTO;
  novaRequisicao: (colecao_id?: string, pasta_id?: string) => void;
  setRequisicao: (requisicao: Partial<RequisicaoDTO>) => void;
  isLoading: boolean;
  fetchRequisicao: (id: string) => Promise<void>;
};

const initialState: RequisicaoDTO = {
  id: '',
  url: '',
  tipo: TipoRequisicao.GET,
  jsonEnvio: '',
  nome: '',
};

const useRequisicaoStore = create<RequisicaoStore>((set, get) => ({
  requisicao: initialState,
  isLoading: false,
  novaRequisicao: (colecao_id, pasta_id) => {
    set(() => ({
      requisicao: {
        ...initialState,
        pasta_id: pasta_id ? pasta_id : '',
        colecao_id: colecao_id ? colecao_id : '',
      },
    }));
  },
  fetchRequisicao: async (id: string) => {
    if (get().requisicao.id === id) return;
    set({ isLoading: true });

    try {
      const requisicaoBuscada = await BuscaRequisicaoPorId(id);
      if (requisicaoBuscada)
        set({ requisicao: requisicaoBuscada, isLoading: false });
    } catch (error) {
      console.log('Erro na busca: ', error);
      set({ isLoading: false });
    }
  },
  setRequisicao: (requisicao) =>
    set((state) => ({
      requisicao: { ...state.requisicao, ...requisicao },
    })),
}));

export default useRequisicaoStore;
