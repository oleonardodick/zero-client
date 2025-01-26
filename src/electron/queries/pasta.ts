import { CrudResult } from '@shared/types';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { PastaColecao } from '@prisma/client';

export const BuscaPastasColecao = async (
  colecao_id: string
): Promise<PastaColecao[]> => {
  return await prisma.pastaColecao.findMany({
    where: {
      colecao_id: colecao_id,
    },
  });
};

export const CriaPastaColecao = async (
  pasta: PastaColecao
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.pastaColecao.create({
      data: {
        nome: pasta.nome,
        colecao_id: pasta.colecao_id,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaPastaColecao = async (
  pasta: PastaColecao
): Promise<CrudResult> => {
  try {
    await prisma.pastaColecao.update({
      data: {
        nome: pasta.nome,
      },
      where: {
        id: pasta.id,
      },
    });
    return { sucesso: true, idCriado: pasta.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ExcluiPastaColecao = async (id: string): Promise<CrudResult> => {
  try {
    await prisma.pastaColecao.delete({
      where: {
        id: id,
      },
    });
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
