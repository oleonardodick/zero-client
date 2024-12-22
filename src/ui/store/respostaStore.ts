import { Resposta } from '@/shared/types';
import { create } from 'zustand';

type RespostaStore = {
  resposta: Resposta;
  setResposta: (novaResposta: Resposta) => void;
};

const useRespostaStore = create<RespostaStore>((set) => ({
  resposta: {
    idRequisicao: '',
    jsonRetorno: '',
    status: 0,
    statusText: '',
    size: 0,
    time: 0,
  },
  setResposta: (novaResposta) =>
    set(() => ({
      resposta: novaResposta,
    })),
}));

export default useRespostaStore;
