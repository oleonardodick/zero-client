import { CrudResult } from '@shared/types.js';
import { Prisma, PrismaClient, VariavelAmbiente } from '@prisma/client';

const prisma = new PrismaClient();

export const buscaTodasVariaveisAmbiente = (): Promise<VariavelAmbiente[]> => {
  return prisma.variavelAmbiente.findMany();
};

export const criaVariavelAmbiente = async (
  nome: string,
  valor: string
): Promise<CrudResult> => {
  try {
    await prisma.variavelAmbiente.create({
      data: {
        nome: nome,
        valor: valor,
      },
    });
    return { sucesso: true };
  } catch (erro) {
    const mensagemErro =
      erro instanceof Error ? erro.message : 'Erro inesperado';
    return { sucesso: false, erro: mensagemErro };
  }
};

export const atualizaValorVariavelAmbiente = async (
  nome: string,
  valor: string
): Promise<CrudResult> => {
  try {
    await prisma.variavelAmbiente.update({
      where: {
        nome: nome,
      },
      data: {
        valor: valor,
      },
    });
    return { sucesso: true };
  } catch (error) {
    const mensagemErro =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
        ? 'Nenhum registro encontrado.'
        : 'Erro inesperado.';
    return { sucesso: false, erro: mensagemErro };
  }
};

export const excluiVariavelAmbiente = async (
  nome: string
): Promise<CrudResult> => {
  try {
    await prisma.variavelAmbiente.delete({
      where: {
        nome: nome,
      },
    });
    return { sucesso: true };
  } catch (error) {
    const mensagemErro =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
        ? 'Nenhum registro encontrado.'
        : 'Erro inesperado.';
    return { sucesso: false, erro: mensagemErro };
  }
};
