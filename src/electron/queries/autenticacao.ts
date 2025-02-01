import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Autenticacao, Basic, Bearer } from '@prisma/client';
import { CrudResult } from '@shared/types.js';

export const CriaAutenticacao = async (
  autenticacao: Autenticacao
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.autenticacao.create({
      data: {
        ...autenticacao,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const CriaAutenticacaoBasic = async (
  basic: Basic
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.basic.create({
      data: {
        ...basic,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const CriaAutenticacaoBearer = async (
  bearer: Bearer
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.bearer.create({
      data: {
        ...bearer,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ExcluiAutenticacaoRequisicao = async (
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    await prisma.autenticacao.delete({
      where: {
        requisicao_id: requisicao_id,
      },
    });
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
