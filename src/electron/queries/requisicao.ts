import { CrudResult, Requisicao } from '@shared/types.js';
import { prisma } from './prisma.js';
import { CriaQueryParam } from './queryParam.js';
import { CriaHeader } from './header.js';
import { CriaAutenticacao } from './autenticacao.js';
import { trataMensagemErro } from '../util.js';

export const CriaRequisicao = async (
  requisicao: Requisicao
): Promise<CrudResult> => {
  try {
    const registroCriado = await prisma.requisicao.create({
      data: {
        url: requisicao.url,
        tipo: requisicao.tipo,
        jsonEnvio: requisicao.jsonEnvio,
      },
    });
    if (requisicao.queryParams)
      CriaQueryParam(requisicao.queryParams, registroCriado.id);
    if (requisicao.header) CriaHeader(requisicao.header, registroCriado.id);
    if (requisicao.autenticacao && requisicao.autenticacao.tipo !== 'none')
      CriaAutenticacao(requisicao.autenticacao, registroCriado.id);
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const AtualizaRequisicao = async (
  requisicao: Requisicao
): Promise<CrudResult> => {
  try {
    const registroExistente = await prisma.requisicao.findUnique({
      where: {
        id: requisicao.id,
      },
    });
    if (registroExistente) {
      await prisma.requisicao.update({
        where: {
          id: requisicao.id,
        },
        data: {
          url: requisicao.url,
          tipo: requisicao.tipo,
          jsonEnvio: requisicao.jsonEnvio,
        },
      });
      if (requisicao.queryParams) {
        //primeiro exclui as que já existiam
        //depois cria novamente
      } else {
        //exclui as que já existiam
      }
      return { sucesso: true };
    } else {
      return { sucesso: false, erro: 'Requisição não encontrada.' };
    }
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
