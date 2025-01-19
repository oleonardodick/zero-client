import { PastaColecaoDTO } from './pastaColecao.dto';
import { RequisicaoDTO } from './requisicao.dto';

export class ColecaoDTO {
  id?: string;
  nome: string;
  pastas?: PastaColecaoDTO[];
  requisicoes?: RequisicaoDTO[];

  constructor(
    id: string,
    nome: string,
    pastas?: PastaColecaoDTO[],
    requisicoes?: RequisicaoDTO[]
  ) {
    this.id = id;
    this.nome = nome;
    this.pastas = pastas;
    this.requisicoes = requisicoes;
  }
}
