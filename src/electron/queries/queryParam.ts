import { QueryParam } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';

export const CriaQueryParam = async (
  queryParams: QueryParam[],
  requisicao_id: string
) => {
  try {
    queryParams.forEach(async (param) => {
      await prisma.queryParam.create({
        data: {
          query: param.query,
          valor: param.valor,
          selecionado: param.selecionado,
          requisicao_id: requisicao_id,
        },
      });
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
