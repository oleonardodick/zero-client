import { ExportPastaColecaoDTO, PastaColecaoDTO } from './pastaColecao.dto';

export interface ColecaoDTO {
  id?: string;
  nome: string;
  pastas: PastaColecaoDTO[];
}

export interface ExportaColecaoDTO {
  client: string;
  nome: string;
  pastas: ExportPastaColecaoDTO[];
}
