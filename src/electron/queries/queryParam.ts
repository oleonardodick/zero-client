import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { QueryParamDTO } from '../../dtos/queryParam.dto.js';

export const CriaQueryParam = async (
  queryParams: QueryParamDTO[],
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

export const ExcluiQueryParamsDaRequisicao = async (requisicao_id: string) => {
  try {
    await prisma.queryParam.deleteMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
