import { CrudResult } from '@shared/types.js';
import { RespostaDTO } from '../../dtos/resposta.dto.js';
import { trataMensagemErro } from '../util.js';
import { prisma } from './prisma.js';

export const CriaResposta = async (
  resposta: RespostaDTO,
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
        requisicao_id: requisicao_id,
      },
    });
    return { sucesso: true, idCriado: registroCriado.id };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ExcluiResposta = async (requisicao_id: string) => {
  try {
    await prisma.resposta.deleteMany({
      where: { requisicao_id: requisicao_id },
    });
  } catch (erro) {
    throw new Error(trataMensagemErro(erro));
  }
};
