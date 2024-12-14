import { Header, QueryParam, Requisicao } from '@/shared/types';
import { create } from 'zustand';

type RequisicaoStore = {
  requisicao: Requisicao;
  inicializaRequisicao: (novaRequisicao: Requisicao) => void;
  setUrl: (url: string) => void;
  addQueryParam: (queryParam: QueryParam) => void;
  updateQueryParam: (id: string, updatedValues: QueryParam) => void;
  deleteQueryParam: (id: string) => void;
  addHeader: (header: Header) => void;
  updateHeader: (id: string, updatedValues: Header) => void;
  deleteHeader: (id: string) => void;
};

const useRequisicaoStore = create<RequisicaoStore>((set) => ({
  requisicao: {
    id: '',
    url: '',
    jsonEnvio: '',
    jsonRetorno: '',
    data: '',
    queryParams: [],
    header: [],
  },
  inicializaRequisicao: (novaRequisicao) =>
    set(() => ({
      requisicao: novaRequisicao,
    })),
  setUrl: (url) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        url,
      },
    })),
  addQueryParam: (queryParam) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        queryParams: [...state.requisicao.queryParams, queryParam],
      },
    })),
  updateQueryParam: (id, updatedValues) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        queryParams: state.requisicao.queryParams.map((param) =>
          param.id === id ? { ...param, ...updatedValues } : param
        ),
      },
    })),
  deleteQueryParam: (id) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        queryParams: state.requisicao.queryParams.filter(
          (param) => param.id !== id
        ),
      },
    })),
  addHeader: (header) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        header: [...state.requisicao.header, header],
      },
    })),
  updateHeader: (id, updatedValues) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        header: state.requisicao.header.map((param) =>
          param.id === id ? { ...param, ...updatedValues } : param
        ),
      },
    })),
  deleteHeader: (id) =>
    set((state) => ({
      requisicao: {
        ...state.requisicao,
        header: state.requisicao.header.filter((param) => param.id !== id),
      },
    })),
}));

export default useRequisicaoStore;
