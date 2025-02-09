import { CrudResult } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Requisicao } from '@prisma/client';
import { ExcluiAutenticacaoRequisicao } from './autenticacao.js';
// import { ExcluiHeadersDaRequisicao } from './header.js';
// import { ExcluiQueryParamsDaRequisicao } from './queryParam.js';
import { ExcluiRespostaRequisicao } from './resposta.js';

export const CriaRequisicao = async (
  requisicao: Partial<Requisicao>
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.requisicao.create({
      data: {
        url: requisicao.url,
        nome: requisicao.nome,
        jsonEnvio: requisicao.jsonEnvio,
        tipo: requisicao.tipo,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaRequisicao = async (
  requisicao: Partial<Requisicao>,
  id: string
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.requisicao.findUnique({
      where: {
        id: id,
      },
    });
    if (registroExistente) {
      ExcluiAutenticacaoRequisicao(id);
      // ExcluiHeadersDaRequisicao(registroExistente.id);
      // ExcluiQueryParamsDaRequisicao(registroExistente.id);
      ExcluiRespostaRequisicao(id);
      await prisma.requisicao.update({
        where: {
          id: id,
        },
        data: {
          url: requisicao.url,
          nome: requisicao.nome,
          jsonEnvio: requisicao.jsonEnvio,
          tipo: requisicao.tipo,
          query_params: { deleteMany: {} },
          headers: { deleteMany: {} },
        },
      });
      return { sucesso: true, idCriado: id };
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
  });
};

export const BuscaRequisicaoPorId = async (
  id: string
): Promise<Requisicao | null> => {
  const requisicao = await prisma.requisicao.findUnique({
    where: {
      id: id,
    },
  });
  return requisicao;
};

export const BuscaRequisicoesColecao = async (
  colecao_id: string
): Promise<Requisicao[]> => {
  const requisicoes = await prisma.requisicao.findMany({
    where: {
      colecao_id: colecao_id,
      pasta_id: null,
    },
  });
  return requisicoes;
};

export const BuscaRequisicoesPasta = async (
  pasta_id: string
): Promise<Requisicao[]> => {
  const requisicoes = await prisma.requisicao.findMany({
    where: { pasta_id: pasta_id },
  });
  return requisicoes;
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
