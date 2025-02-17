import axios, { AxiosError, AxiosResponse } from 'axios';
import { RespostaDTO } from '@/dtos/resposta.dto';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { HeaderDTO } from '@/dtos/header.dto';
import { AutenticacaoDTO } from '@/dtos/autenticacao.dto';

export const enviarRequisicao = async (
  requisicao: RequisicaoDTO,
  headers: HeaderDTO[],
  autenticacao: AutenticacaoDTO
): Promise<RespostaDTO> => {
  const inicio: number = Date.now();

  const headersObj = headers.reduce((acc, { header, valor, selecionado }) => {
    if (selecionado && header && valor) {
      acc[header] = valor;
    }
    return acc;
  }, {} as Record<string, string>);

  if (autenticacao.tipo === 'bearer' && autenticacao.bearer?.token) {
    headersObj[
      'Authorization'
    ] = `${autenticacao.bearer.prefix}||Bearer ${autenticacao.bearer.token}`;
  } else if (
    autenticacao.tipo === 'basic' &&
    autenticacao.basic?.usuario &&
    autenticacao.basic?.senha
  ) {
    const credentials = btoa(
      `${autenticacao.basic.usuario}:${autenticacao.basic.senha}`
    );
    headersObj['Authorization'] = `Basic ${credentials}`;
  }

  try {
    const response = await axios({
      method: requisicao.tipo,
      url: requisicao.url,
      data: requisicao.jsonEnvio,
      headers: Object.keys(headersObj).length > 0 ? headersObj : undefined,
    });
    const contentType: string = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      const error: AxiosError = new AxiosError();

      error.response = {
        data: 'Recurso não encontrado',
        status: 404,
        statusText: 'Not Found',
        headers: response.headers,
        config: response.config,
      };

      throw error;
    }
    return montaRetorno(response, inicio, Date.now(), requisicao.id);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return montaRetorno(error.response, inicio, Date.now(), requisicao.id);
      }
      if (error.request) {
        return montaRetorno(error.request, inicio, Date.now(), requisicao.id);
      }
      throw new Error('teste');
    }
    throw error;
  }
};

const calculaTamanhoResposta = (json: string): number => {
  return new TextEncoder().encode(formataJson(json)).length;
};

const calculaTempoRequisicao = (inicio: number, fim: number): number => {
  return fim - inicio;
};

const formataJson = (json: string): string => {
  return JSON.stringify(json, null, 2);
};

const montaRetorno = (
  response: AxiosResponse,
  inicio: number,
  fim: number,
  requisicao_id: string
): RespostaDTO => {
  const resposta: RespostaDTO = {
    json_retorno: formataJson(response.data),
    status: response.status,
    status_text: response.statusText,
    size: calculaTamanhoResposta(response.data),
    time: calculaTempoRequisicao(inicio, fim),
    requisicao_id: requisicao_id,
  };
  return resposta;
};
