import { AutenticacaoDTO } from '@/dtos/autenticacao.dto';
import { HeaderDTO } from '@/dtos/header.dto';
import { QueryParamDTO } from '@/dtos/queryParam.dto';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { create } from 'zustand';
import { TipoRequisicao } from '../enums/tipoRequisicao.enum';

type RequisicaoStore = {
  requisicao: RequisicaoDTO;
  inicializaRequisicao: (novaRequisicao: RequisicaoDTO) => void;
  setUrl: (url: string) => void;
  setTipo: (tipo: string) => void;
  setJsonEnvio: (json: string) => void;
  queryParams: QueryParamDTO[];
  addQueryParam: (queryParam: QueryParamDTO) => void;
  updateQueryParam: (id: string, updatedValues: QueryParamDTO) => void;
  deleteQueryParam: (id: string) => void;
  headers: HeaderDTO[];
  addHeader: (header: HeaderDTO) => void;
  updateHeader: (id: string, updatedValues: HeaderDTO) => void;
  deleteHeader: (id: string) => void;
  autenticacao: AutenticacaoDTO;
  setTipoAutenticacao: (tipo: 'none' | 'bearer' | 'basic') => void;
  setAutenticacao: (dados: AutenticacaoDTO) => void;
};

const useRequisicaoStore = create<RequisicaoStore>((set) => ({
  requisicao: {
    url: '',
    tipo: TipoRequisicao.GET,
    jsonEnvio: '',
    nome: '',
  },
  queryParams: [],
  headers: [],
  autenticacao: { tipo: 'none' },
  inicializaRequisicao: (novaRequisicao: RequisicaoDTO) =>
    set(() => ({
      requisicao: novaRequisicao,
      queryParams: novaRequisicao.query_params || [],
      headers: novaRequisicao.headers || [],
      autenticacao: novaRequisicao.autenticacao || { tipo: 'none' },
    })),
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
  addQueryParam: (queryParam: QueryParamDTO) =>
    set((state) => ({
      queryParams: [...state.queryParams, queryParam],
    })),
  updateQueryParam: (id, updatedValues: QueryParamDTO) =>
    set((state) => ({
      queryParams: state.queryParams.map((param) =>
        param.id === id ? updatedValues : param
      ),
    })),
  deleteQueryParam: (id: string) =>
    set((state) => ({
      queryParams: state.queryParams.filter((param) => param.id !== id),
    })),
  addHeader: (header: HeaderDTO) =>
    set((state) => ({
      headers: [...state.headers, header],
    })),
  updateHeader: (id, updatedValues: HeaderDTO) =>
    set((state) => ({
      headers: state.headers.map((header) =>
        header.id === id ? { ...header, ...updatedValues } : header
      ),
    })),
  deleteHeader: (id: string) =>
    set((state) => ({
      headers: state.headers.filter((header) => header.id !== id),
    })),
  setTipoAutenticacao: (tipo) =>
    set((state) => ({
      autenticacao: { ...state.autenticacao, tipo },
    })),
  setAutenticacao: (dados: AutenticacaoDTO) =>
    set((state) => ({
      autenticacao: {
        ...state.autenticacao,
        ...dados,
      },
    })),
}));

export default useRequisicaoStore;
