import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { Header } from '@prisma/client';

export const BuscaHeadersDaRequisicao = async (
  requisicao_id: string
): Promise<Header[]> => {
  try {
    return prisma.header.findMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};

export const CriaHeader = async (headers: Header[]) => {
  try {
    headers.forEach(async (header) => {
      await prisma.header.create({
        data: {
          header: header.header,
          valor: header.valor,
          selecionado: header.selecionado,
          requisicao: {
            connect: { id: header.requisicao_id },
          },
        },
      });
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};

export const ExcluiHeadersDaRequisicao = async (requisicao_id: string) => {
  try {
    await prisma.header.deleteMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
