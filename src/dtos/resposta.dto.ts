export class RespostaDTO {
  json_retorno: string;
  status: number;
  status_text: string;
  size: number;
  time: number;
  id?: string;

  constructor(
    json_retorno: string,
    status: number,
    status_text: string,
    size: number,
    time: number,
    id?: string
  ) {
    this.json_retorno = json_retorno;
    this.status = status;
    this.status_text = status_text;
    this.size = size;
    this.time = time;
    this.id = id;
  }
}
