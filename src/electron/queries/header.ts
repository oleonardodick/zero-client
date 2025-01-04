import { Header } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';

export const CriaHeader = async (headers: Header[], requisicao_id: string) => {
  try {
    headers.forEach(async (header) => {
      await prisma.header.create({
        data: {
          header: header.header,
          valor: header.valor,
          selecionado: header.selecionado,
          requisicao_id: requisicao_id,
        },
      });
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
