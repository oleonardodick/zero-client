import { RespostaDTO } from '@/dtos/resposta.dto';
import { create } from 'zustand';

type RespostaStore = {
  resposta: RespostaDTO;
  inicializaResposta: (novaResposta: RespostaDTO) => void;
  limpaReposta: () => void;
};

const useRespostaStore = create<RespostaStore>((set) => ({
  resposta: {
    json_retorno: '',
    status: 0,
    status_text: '',
    size: 0,
    time: 0,
  },
  inicializaResposta: (novaResposta: RespostaDTO) =>
    set(() => ({
      resposta: novaResposta,
    })),
  limpaReposta: () =>
    set(() => ({
      resposta: {
        json_retorno: '',
        status: 0,
        status_text: '',
        size: 0,
        time: 0,
      },
    })),
}));

export default useRespostaStore;
