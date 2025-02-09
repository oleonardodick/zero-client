import { CrudResult } from '@shared/types.js';
import { trataMensagemErro } from '../util.js';
import { prisma } from './prisma.js';
import { Resposta } from '@prisma/client';

export const BuscaRespostaDaRequisicao = async (
  requisicao_id: string
): Promise<Resposta | null> => {
  try {
    return await prisma.resposta.findFirst({
      where: {
        requisicao_id: requisicao_id,
      },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};

export const CriaResposta = async (
  resposta: Resposta,
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.resposta.create({
      data: {
        json_retorno: resposta.json_retorno,
        status: resposta.status,
        status_text: resposta.status_text,
        size: resposta.size,
        time: resposta.time,
        requisicao: {
          connect: { id: requisicao_id },
        },
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaResposta = async (
  resposta: Resposta,
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.resposta.findUnique({
      where: { requisicao_id: requisicao_id },
    });
    if (registroExistente) {
      await prisma.resposta.update({
        where: {
          id: registroExistente.id,
        },
        data: {
          json_retorno: resposta.json_retorno,
          size: resposta.size,
          status: resposta.status,
          status_text: resposta.status_text,
          time: resposta.time,
        },
      });
      return { sucesso: true, idCriado: registroExistente.id };
    } else {
      return CriaResposta(resposta, requisicao_id);
    }
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ExcluiRespostaRequisicao = async (requisicao_id: string) => {
  try {
    await prisma.resposta.deleteMany({
      where: { requisicao_id: requisicao_id },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
