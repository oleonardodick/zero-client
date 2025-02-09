import { QueryParamDTO } from '@/dtos/queryParam.dto';
import { create } from 'zustand';
import { BuscaQueryParamsDaRequisicao } from '../services/queryParams.service';

type QueryParamStore = {
  queryParams: QueryParamDTO[];
  addQueryParam: (queryParam: QueryParamDTO) => void;
  updateQueryParam: (id: string, newData: Partial<QueryParamDTO>) => void;
  deleteQueryParam: (id: string) => void;
  isLoading: boolean;
  requisicaoPosicionada: string;
  fetchQueryParams: (id_requisicao: string) => Promise<void>;
};

export const useQueryParamStore = create<QueryParamStore>((set, get) => ({
  queryParams: [],
  isLoading: false,
  requisicaoPosicionada: '',
  fetchQueryParams: async (id_requisicao: string) => {
    if (get().requisicaoPosicionada === id_requisicao) return;
    set({ isLoading: true });
    set({ requisicaoPosicionada: id_requisicao });
    try {
      const queryParamsBuscados = await BuscaQueryParamsDaRequisicao(
        id_requisicao
      );
      if (queryParamsBuscados)
        set({ queryParams: queryParamsBuscados, isLoading: false });
    } catch (error) {
      console.log('Erro na busca: ', error);
      set({ isLoading: false });
    }
  },
  addQueryParam: (queryParam) =>
    set((state) => ({ queryParams: [...state.queryParams, queryParam] })),
  updateQueryParam: (id, newData) =>
    set((state) => ({
      queryParams: state.queryParams.map((queryParam) =>
        queryParam.id === id ? { ...queryParam, ...newData } : queryParam
      ),
    })),
  deleteQueryParam: (id) =>
    set((state) => ({
      queryParams: state.queryParams.filter(
        (queryParam) => queryParam.id != id
      ),
    })),
}));
