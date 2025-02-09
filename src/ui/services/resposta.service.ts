import { RespostaDTO } from '@/dtos/resposta.dto';

export const BuscaRespostaDaRequisicao = async (
  requisicao_id: string
): Promise<RespostaDTO | null> => {
  try {
    return await window.electron.buscaRespostaDaRequisicao(requisicao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar a resposta da requisição');
  }
};
