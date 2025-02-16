export interface RequisicaoDTO {
  id: string;
  url: string;
  tipo: string;
  jsonEnvio: string;
  nome: string;
  data?: Date;
  colecao_id?: string;
  pasta_id?: string;
}
