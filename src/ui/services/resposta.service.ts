import { RespostaDTO } from '@/dtos/resposta.dto';
import { CrudResult } from '@/shared/types';

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

export const CriaReposta = async (
  resposta: RespostaDTO,
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    return await window.electron.criaResposta(resposta, requisicao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar a resposta da requisição');
  }
};

export const AtualizaResposta = async (
  resposta: RespostaDTO,
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    return await window.electron.atualizaResposta(resposta, requisicao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar a resposta da requisição');
  }
};
