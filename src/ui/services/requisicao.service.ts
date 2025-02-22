import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { CrudResult } from '@/shared/types';

export const BuscaRequisicaoPorId = async (
  id: string
): Promise<RequisicaoDTO | null> => {
  try {
    return await window.electron.buscaRequisicaoPorId(id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as requisições da coleção');
  }
};

export const BuscaRequisicoesColecao = async (
  colecao_id: string
): Promise<RequisicaoDTO[]> => {
  try {
    return await window.electron.buscaRequisicoesColecao(colecao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as requisições da coleção');
  }
};

export const BuscaRequisicoesPasta = async (
  pasta_id: string
): Promise<RequisicaoDTO[]> => {
  try {
    return await window.electron.buscaRequisicoesPasta(pasta_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as requisições da coleção');
  }
};

export const BuscaUltimasRequisicoes = async (): Promise<RequisicaoDTO[]> => {
  try {
    return await window.electron.buscaUltimasRequisicoes();
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar as última requisições');
  }
};

export const CriaRequisicao = async (
  requisicao: RequisicaoDTO
): Promise<CrudResult> => {
  try {
    return await window.electron.criaRequisicao(requisicao);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar a requisição');
  }
};

export const AtualizaRequisicao = async (
  requisicao: RequisicaoDTO,
  id: string
): Promise<CrudResult> => {
  try {
    return await window.electron.atualizaRequisicao(requisicao, id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível atualizar a requisição');
  }
};
