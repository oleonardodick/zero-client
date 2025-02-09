import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Autenticacao, Basic, Bearer } from '@prisma/client';
import { CrudResult } from '@shared/types.js';

export const BuscaAutenticacaoDaRequisicao = async (
  requisicao_id: string
): Promise<Autenticacao | null> => {
  try {
    return await prisma.autenticacao.findFirst({
      where: {
        requisicao_id: requisicao_id,
      },
      include: {
        bearer: true,
        basic: true,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};

export const CriaAutenticacao = async (
  autenticacao: Autenticacao
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.autenticacao.create({
      data: {
        tipo: autenticacao.tipo,
        requisicao: {
          connect: { id: autenticacao.requisicao_id },
        },
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
        senha: basic.senha,
        usuario: basic.usuario,
        autenticacao: {
          connect: { id: basic.autenticacao_id },
        },
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
        prefix: bearer.prefix,
        token: bearer.token,
        autenticacao: {
          connect: { id: bearer.autenticacao_id },
        },
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
    await prisma.autenticacao.deleteMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
