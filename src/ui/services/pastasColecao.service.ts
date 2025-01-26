import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import { CrudResult } from '@/shared/types';

export const BuscaPastasColecao = async (
  colecao_id: string
): Promise<PastaColecaoDTO[]> => {
  try {
    return await window.electron.buscaPastasColecao(colecao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as pastas da coleção');
  }
};

export const CriaPastasColecao = async (
  pasta: PastaColecaoDTO
): Promise<CrudResult> => {
  try {
    return await window.electron.criaPastaColecao(pasta);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar a pasta da coleção');
  }
};

export const AtualizaPastaColecao = async (
  pasta: PastaColecaoDTO
): Promise<CrudResult> => {
  try {
    return await window.electron.atualizaPastaColecao(pasta);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível atualizar a pasta da coleção');
  }
};

export const excluirColecao = async (id: string): Promise<CrudResult> => {
  try {
    return await window.electron.excluiPastaColecao(id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível excluir a pasta da coleção');
  }
};
