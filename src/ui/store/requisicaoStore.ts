import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { create } from 'zustand';
import { TipoRequisicao } from '../enums/tipoRequisicao.enum';
import { BuscaRequisicaoPorId } from '../services/requisicao.service';
import { v4 as uuidv4 } from 'uuid';

type RequisicaoStore = {
  requisicao: RequisicaoDTO;
  setUrl: (url: string) => void;
  setTipo: (tipo: string) => void;
  setJsonEnvio: (json: string) => void;
  isLoading: boolean;
  fetchRequisicao: (id: string) => Promise<void>;
};

const useRequisicaoStore = create<RequisicaoStore>((set, get) => ({
  requisicao: {
    id: uuidv4(),
    url: '',
    tipo: TipoRequisicao.GET,
    jsonEnvio: '',
    nome: '',
    data: new Date(),
    pasta_id: '',
    colecao_id: '',
  },
  isLoading: false,
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
  setUrl: (url: string) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        url: url,
      },
    })),
  setTipo: (tipo: string) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        tipo: tipo,
      },
    })),
  setJsonEnvio: (json: string) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        jsonEnvio: json,
      },
    })),
}));

export default useRequisicaoStore;
