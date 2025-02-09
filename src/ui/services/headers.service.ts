import { HeaderDTO } from '@/dtos/header.dto';
import { CrudResult } from '@/shared/types';

export const BuscaHeadersDaRequisicao = async (
  requisicao_id: string
): Promise<HeaderDTO[]> => {
  try {
    return await window.electron.buscaHeadersDaRequisicao(requisicao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar os haders');
  }
};

export const CriaHeadersRequisicao = async (
  headers: HeaderDTO[],
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    const headersEnviar = headers.map((header) => ({
      ...header,
      requisicao_id: requisicao_id,
    }));
    return await window.electron.criaHeader(headersEnviar);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar os haders');
  }
};
