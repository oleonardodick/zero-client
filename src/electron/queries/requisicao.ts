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

export const CriaRequisicao = async (
  requisicao: RequisicaoDTO
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.requisicao.create({
      data: {
        url: requisicao.url,
        tipo: requisicao.tipo,
        jsonEnvio: requisicao.jsonEnvio,
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
        },
      });
      ExcluiQueryParamsDaRequisicao(registroExistente.id);
      if (requisicao.query_params)
        CriaQueryParam(requisicao.query_params, registroExistente.id);
      ExcluiHeadersDaRequisicao(registroExistente.id);
      if (requisicao.headers)
        CriaHeader(requisicao.headers, registroExistente.id);
      ExcluiAutenticacaoDaRequisicao(registroExistente.id);
      if (requisicao.autenticacao && requisicao.autenticacao.tipo !== 'none')
        CriaAutenticacao(requisicao.autenticacao, registroExistente.id);

      return { sucesso: true };
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
    },
  });
  return requisicao;
};
