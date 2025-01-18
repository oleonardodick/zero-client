import { CrudResult } from '@shared/types.js';
import { prisma } from './prisma.js';
import { CriaQueryParam, ExcluiQueryParamsDaRequisicao } from './queryParam.js';
import { CriaHeader, ExcluiHeadersDaRequisicao } from './header.js';
import {
  CriaAutenticacao,
  ExcluiAutenticacaoDaRequisicao,
} from './autenticacao.js';
import { trataMensagemErro } from '../util.js';
import { RequisicaoDTO } from '../../dtos/requisicao.dto.js';
import { ExcluiResposta } from './resposta.js';

export const CriaRequisicao = async (
  requisicao: RequisicaoDTO
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.requisicao.create({
      data: {
        url: requisicao.url,
        tipo: requisicao.tipo,
        jsonEnvio: requisicao.jsonEnvio,
        nome: requisicao.nome,
      },
    });
    if (requisicao.query_params)
      CriaQueryParam(requisicao.query_params, registroCriado.id);
    if (requisicao.headers) CriaHeader(requisicao.headers, registroCriado.id);
    if (requisicao.autenticacao && requisicao.autenticacao.tipo !== 'none')
      CriaAutenticacao(requisicao.autenticacao, registroCriado.id);
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaRequisicao = async (
  requisicao: RequisicaoDTO
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.requisicao.findUnique({
      where: {
        id: requisicao.id,
      },
    });
    if (registroExistente) {
      await prisma.requisicao.update({
        where: {
          id: requisicao.id,
        },
        data: {
          url: requisicao.url,
          tipo: requisicao.tipo,
          jsonEnvio: requisicao.jsonEnvio,
          nome: requisicao.nome,
        },
      });
      await ExcluiResposta(registroExistente.id);
      await ExcluiQueryParamsDaRequisicao(registroExistente.id);
      if (requisicao.query_params)
        await CriaQueryParam(requisicao.query_params, registroExistente.id);
      await ExcluiHeadersDaRequisicao(registroExistente.id);
      if (requisicao.headers)
        await CriaHeader(requisicao.headers, registroExistente.id);
      await ExcluiAutenticacaoDaRequisicao(registroExistente.id);
      if (requisicao.autenticacao && requisicao.autenticacao.tipo !== 'none')
        await CriaAutenticacao(requisicao.autenticacao, registroExistente.id);

      return { sucesso: true, idCriado: registroExistente.id };
    } else {
      return { sucesso: false, erro: 'Requisição não encontrada.' };
    }
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const BuscaUltimasRequisicoes = async (): Promise<RequisicaoDTO[]> => {
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
): Promise<RequisicaoDTO | null> => {
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
