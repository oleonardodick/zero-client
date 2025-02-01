import { CrudResult } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Requisicao } from '@prisma/client';
import { ExcluiAutenticacaoRequisicao } from './autenticacao.js';
import { ExcluiHeadersDaRequisicao } from './header.js';
import { ExcluiQueryParamsDaRequisicao } from './queryParam.js';
import { ExcluiRespostaRequisicao } from './resposta.js';

export const CriaRequisicao = async (
  requisicao: Requisicao
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.requisicao.create({
      data: {
        ...requisicao,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaRequisicao = async (
  requisicao: Requisicao
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.requisicao.findUnique({
      where: {
        id: requisicao.id,
      },
    });
    if (registroExistente) {
      ExcluiAutenticacaoRequisicao(registroExistente.id);
      ExcluiHeadersDaRequisicao(registroExistente.id);
      ExcluiQueryParamsDaRequisicao(registroExistente.id);
      ExcluiRespostaRequisicao(registroExistente.id);
      await prisma.requisicao.update({
        where: {
          id: requisicao.id,
        },
        data: {
          ...requisicao,
        },
      });
      return { sucesso: true, idCriado: registroExistente.id };
    } else {
      return { sucesso: false, erro: 'Requisição não encontrada.' };
    }
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const BuscaUltimasRequisicoes = async (): Promise<Requisicao[]> => {
  return await prisma.requisicao.findMany({
    take: 10,
    orderBy: {
      data: 'desc',
    },
    include: {
      query_params: true,
      headers: true,
      autenticacao: {
        include: {
          bearer: true,
          Basic: true,
        },
      },
      resposta: true,
    },
  });
};

export const BuscaRequisicaoPorId = async (
  id: string
): Promise<Requisicao | null> => {
  const requisicao = await prisma.requisicao.findUnique({
    where: {
      id: id,
    },
    include: {
      query_params: true,
      headers: true,
      autenticacao: {
        include: {
          bearer: true,
          Basic: true,
        },
      },
      resposta: true,
    },
  });
  return requisicao;
};

export const ExcluiRequisicao = async (id: string): Promise<CrudResult> => {
  try {
    await prisma.requisicao.delete({
      where: { id: id },
    });
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
