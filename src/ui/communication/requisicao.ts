import axios, { AxiosError, AxiosResponse } from 'axios';
import { Requisicao } from '@/shared/types';
import { IRepostaCustomizada } from '../interface/IRespostaCustomizada';

export const enviarRequisicao = async (
  requisicao: Requisicao
): Promise<IRepostaCustomizada> => {
  const inicio: number = Date.now();
  try {
    const response = await axios({
      method: requisicao.tipo,
      url: requisicao.url,
      data: requisicao.jsonEnvio,
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
    return montaRetorno(response, inicio, Date.now());
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return montaRetorno(error.response, inicio, Date.now());
      }
      if (error.request) {
        return montaRetorno(error.request, inicio, Date.now());
      }
      throw new Error('teste');
    }
    throw error;
  }
};

const calculaTamanhoResposta = (json: string): number => {
  return new TextEncoder().encode(JSON.stringify(json, null, 2)).length;
};

const calculaTempoRequisicao = (inicio: number, fim: number): number => {
  return fim - inicio;
};

const montaRetorno = (
  response: AxiosResponse,
  inicio: number,
  fim: number
): IRepostaCustomizada => {
  return {
    axiosResponse: response,
    size: calculaTamanhoResposta(response.data),
    time: calculaTempoRequisicao(inicio, fim),
  };
};
