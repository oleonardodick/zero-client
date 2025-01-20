import { ColecaoDTO } from '@/dtos/colecao.dto';
import { CrudResult } from '@/shared/types';

export const buscarColecoes = async (): Promise<ColecaoDTO[]> => {
  try {
    return await window.electron.buscaColecoes();
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as coleções');
  }
};

export const criarColecao = async (data: ColecaoDTO): Promise<CrudResult> => {
  try {
    return await window.electron.criaColecao(data);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar a coleção');
  }
};

export const atualizarColecao = async (
  data: ColecaoDTO
): Promise<CrudResult> => {
  try {
    return await window.electron.atualizaColecao(data);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível atualizar a coleção');
  }
};

export const excluirColecao = async (id: string): Promise<CrudResult> => {
  try {
    return await window.electron.excluiColecao(id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível excluir a coleção');
  }
};
