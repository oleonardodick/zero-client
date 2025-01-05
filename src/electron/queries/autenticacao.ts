import { prisma } from './prisma.js';
import { trataMensagemErro } from '../util.js';
import { AutenticacaoDTO } from '../../dtos/autenticacao.dto.js';

export const CriaAutenticacao = async (
  autenticacao: AutenticacaoDTO,
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

export const ExcluiAutenticacaoDaRequisicao = async (requisicao_id: string) => {
  try {
    await prisma.autenticacao.deleteMany({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
