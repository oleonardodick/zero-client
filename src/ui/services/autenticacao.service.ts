import { AutenticacaoDTO, Basic, Bearer } from '@/dtos/autenticacao.dto';
import { CrudResult } from '@/shared/types';

export const BuscaAutenticacaoDaRequisicao = async (
  requisicao_id: string
): Promise<AutenticacaoDTO | null> => {
  try {
    return await window.electron.buscaAutenticacaoDaRequisicao(requisicao_id);
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível buscar a autenticacao');
  }
};

export const CriaAutenticacaoRequisicao = async (
  autenticacao: AutenticacaoDTO,
  requisicao_id: string
): Promise<CrudResult> => {
  try {
    autenticacao.requisicao_id = requisicao_id;
    const resultado = await window.electron.criaAutenticacao(autenticacao);
    if (resultado.sucesso && resultado.idCriado) {
      const idAutenticacao = resultado.idCriado;
      if (autenticacao.tipo === 'basic' && autenticacao.basic) {
        CriaAutenticacaoBasic(autenticacao.basic, idAutenticacao);
      } else if (autenticacao.tipo === 'bearer' && autenticacao.bearer) {
        CriaAutenticacaoBearer(autenticacao.bearer, idAutenticacao);
      }
    }
    return resultado;
  } catch (erro) {
    console.log(erro);
    throw new Error('Não foi possível criar a autenticacao');
  }
};

const CriaAutenticacaoBasic = async (basic: Basic, autenticacao_id: string) => {
  try {
    basic.autenticacao_id = autenticacao_id;
    await window.electron.criaAutenticacaoBasic(basic);
  } catch (erro) {
    console.log(erro);
  }
};

const CriaAutenticacaoBearer = async (
  bearer: Bearer,
  autenticacao_id: string
) => {
  try {
    bearer.autenticacao_id = autenticacao_id;
    await window.electron.criaAutenticacaoBearer(bearer);
  } catch (erro) {
    console.log(erro);
  }
};
