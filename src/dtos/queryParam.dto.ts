export class QueryParamDTO {
  id: string;
  query: string;
  valor: string;
  selecionado: boolean;

  constructor(id: string, query: string, valor: string, selecionado: boolean) {
    this.id = id;
    this.query = query;
    this.valor = valor;
    this.selecionado = selecionado;
  }
}
