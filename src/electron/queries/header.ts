import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { HeaderDTO } from '../../dtos/header.dto.js';

export const CriaHeader = async (
  headers: HeaderDTO[],
  requisicao_id: string
) => {
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
