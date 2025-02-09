import { QueryParamDTO } from '@/dtos/queryParam.dto';
import { CrudResult } from '@/shared/types';

export const BuscaQueryParamsDaRequisicao = async (
  id_requisicao: string
): Promise<QueryParamDTO[]> => {
  try {
    return await window.electron.buscaQueryParamsDaRequisicao(id_requisicao);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar os query params');
  }
};

export const CriaQueryParamsRequisicao = async (
  queryParams: QueryParamDTO[],
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    const paramsEnviar = queryParams.map((param) => ({
      ...param,
      requisicao_id: requisicao_id,
    }));
    return await window.electron.criaQueryParam(paramsEnviar);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar os query params');
  }
};
