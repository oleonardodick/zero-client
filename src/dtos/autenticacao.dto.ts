export interface AutenticacaoDTO {
  id: string;
  tipo: string;
  bearer?: Bearer | null;
  basic?: Basic | null;
  requisicao_id: string;
}

export interface Bearer {
  prefix: string;
  token: string;
  autenticacao_id: string;
}

export interface Basic {
  usuario: string;
  senha: string;
  autenticacao_id: string;
}
