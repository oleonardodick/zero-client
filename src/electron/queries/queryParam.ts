import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { QueryParam } from '@prisma/client';

export const BuscaQueryParamsDaRequisicao = async (
  requisicao_id: string
): Promise<QueryParam[]> => {
  try {
    return await prisma.queryParam.findMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};

export const CriaQueryParam = async (queryParams: QueryParam[]) => {
  try {
    queryParams.forEach(async (param) => {
      await prisma.queryParam.create({
        data: {
          query: param.query,
          valor: param.valor,
          selecionado: param.selecionado,
          requisicao: {
            connect: { id: param.requisicao_id },
          },
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
