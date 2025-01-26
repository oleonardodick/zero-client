import { CrudResult } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Colecao } from '@prisma/client';

export const BuscaColecoes = async (): Promise<Colecao[]> => {
  return await prisma.colecao.findMany({
    include: {
      pastas: true,
    },
  });
};

export const BuscaColecaoPorId = async (
  id: string
): Promise<Colecao | null> => {
  return await prisma.colecao.findUnique({
    where: {
      id: id,
    },
  });
};

export const CriaColecao = async (colecao: Colecao): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.colecao.create({
      data: {
        nome: colecao.nome,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaColecao = async (
  colecao: Colecao
): Promise<CrudResult> => {
  try {
    await prisma.colecao.update({
      where: {
        id: colecao.id,
      },
      data: {
        nome: colecao.nome,
      },
    });
    return { sucesso: true, idCriado: colecao.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ExcluiColecao = async (id: string): Promise<CrudResult> => {
  try {
    await prisma.colecao.delete({
      where: {
        id: id,
      },
    });
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
