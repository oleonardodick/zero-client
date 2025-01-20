import { CrudResult } from '@shared/types.js';
import { ColecaoDTO } from '../../dtos/colecao.dto.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';

export const BuscaColecoes = async (): Promise<ColecaoDTO[]> => {
  return await prisma.colecao.findMany();
};

export const CriaColecao = async (colecao: ColecaoDTO): Promise<CrudResult> => {
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
  colecao: ColecaoDTO
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
