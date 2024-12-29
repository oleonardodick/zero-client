import { CrudResult } from '@shared/types.js';
import { Prisma, VariavelAmbiente } from '@prisma/client';
import { prisma } from './prisma.js';

export const buscaTodasVariaveisAmbiente = async (): Promise<
  VariavelAmbiente[]
> => {
  return await prisma.variavelAmbiente.findMany();
};

export const criaVariavelAmbiente = async (
  nome: string,
  valor: string
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.variavelAmbiente.findUnique({
      where: {
        nome: nome,
      },
    });
    if (registroExistente)
      return {
        sucesso: false,
        erro: 'Já existe uma variável de ambiente com este nome.',
      };

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
