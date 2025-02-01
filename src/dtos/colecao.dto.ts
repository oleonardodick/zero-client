import { PastaColecaoDTO } from './pastaColecao.dto';

export interface ColecaoDTO {
  id?: string;
  nome: string;
  pastas: PastaColecaoDTO[];
}
