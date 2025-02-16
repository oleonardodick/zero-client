import { RespostaDTO } from '@/dtos/resposta.dto';
import { create } from 'zustand';
import { BuscaRespostaDaRequisicao } from '../services/resposta.service';

type RespostaStore = {
  resposta: RespostaDTO;
  setResposta: (resposta: RespostaDTO) => void;
  isLoading: boolean;
  requisicaoPosicionada: string;
  fetchResposta: (id_requisicao: string) => Promise<void>;
};

const initialValues: RespostaDTO = {
  json_retorno: '',
  status: 0,
  status_text: '',
  size: 0,
  time: 0,
  requisicao_id: '',
};

const useRespostaStore = create<RespostaStore>((set, get) => ({
  resposta: initialValues,
  isLoading: false,
  requisicaoPosicionada: '',
  fetchResposta: async (id_requisicao: string) => {
    if (get().requisicaoPosicionada === id_requisicao) return;
    set({ isLoading: true, requisicaoPosicionada: id_requisicao });
    const respostaBuscada = await BuscaRespostaDaRequisicao(id_requisicao);
    set({
      resposta: respostaBuscada ? respostaBuscada : initialValues,
      isLoading: false,
    });
  },
  setResposta: (resposta) =>
    set((state) => ({
      resposta: { ...state.resposta, ...resposta },
    })),
}));

export default useRespostaStore;
