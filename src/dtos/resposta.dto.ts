export interface RespostaDTO {
  json_retorno: string;
  status: number;
  status_text: string;
  size: number;
  time: number;
  id?: string;
  requisicao_id: string;
}
