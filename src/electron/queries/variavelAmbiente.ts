import { CrudResult } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { VariavelAmbienteDTO } from '../../dtos/variavelAmbiente.dto.js';

export const buscaTodasVariaveisAmbiente = async (): Promise<
  VariavelAmbienteDTO[]
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
    return { sucesso: false, erro: trataMensagemErro(erro) };
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
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
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
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
