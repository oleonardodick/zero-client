import { Autenticacao } from '@shared/types.js';
import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';

export const CriaAutenticacao = async (
  autenticacao: Autenticacao,
  requisicao_id: string
) => {
  try {
    const registroCriado = await prisma.autenticacao.create({
      data: {
        tipo: autenticacao.tipo,
        requisicao_id: requisicao_id,
      },
    });
    if (autenticacao.basic) {
      await prisma.basic.create({
        data: {
          autenticacao_id: registroCriado.id,
          senha: autenticacao.basic.senha || '',
          usuario: autenticacao.basic.usuario || '',
        },
      });
    } else {
      await prisma.bearer.create({
        data: {
          autenticacao_id: registroCriado.id,
          prefix: autenticacao.bearer?.prefix || '',
          token: autenticacao.bearer?.token || '',
        },
      });
    }
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
