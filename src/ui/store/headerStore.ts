import { create } from 'zustand';
import { HeaderDTO } from '@/dtos/header.dto';
import { BuscaHeadersDaRequisicao } from '../services/headers.service';

type HeaderStore = {
  headers: HeaderDTO[];
  addHeader: (header: HeaderDTO) => void;
  updateHeader: (id: string, newData: Partial<HeaderDTO>) => void;
  deleteHeader: (id: string) => void;
  isLoading: boolean;
  buscaJaRealizada: boolean;
  fetchHeaders: (requisicao_id: string) => Promise<void>;
};

export const useHeaderStore = create<HeaderStore>((set, get) => ({
  headers: [],
  isLoading: false,
  buscaJaRealizada: false,
  fetchHeaders: async (requisicao_id: string) => {
    if (get().buscaJaRealizada) return;
    set({ isLoading: true });
    try {
      const headersBuscados = await BuscaHeadersDaRequisicao(requisicao_id);
      if (headersBuscados) set({ headers: headersBuscados, isLoading: false });
      set({ buscaJaRealizada: true });
    } catch (error) {
      console.log('Erro na busca: ', error);
      set({ isLoading: false });
    }
  },
  addHeader: (queryParam) =>
    set((state) => ({ headers: [...state.headers, queryParam] })),
  updateHeader: (id, newData) =>
    set((state) => ({
      headers: state.headers.map((queryParam) =>
        queryParam.id === id ? { ...queryParam, ...newData } : queryParam
      ),
    })),
  deleteHeader: (id) =>
    set((state) => ({
      headers: state.headers.filter((queryParam) => queryParam.id != id),
    })),
}));
