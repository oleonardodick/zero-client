import { Prisma } from '@prisma/client';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function trataMensagemErro(erro: unknown): string {
  const mensagemErro =
    erro instanceof Prisma.PrismaClientKnownRequestError &&
    erro.code === 'P2025'
      ? 'Nenhum registro encontrado.'
      : erro instanceof Error
      ? erro.message
      : 'Erro inesperado';
  return mensagemErro;
}
