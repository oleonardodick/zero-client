import {
  ExportPastaColecaoDTO,
  PastaColecaoDTO,
} from '@/dtos/pastaColecao.dto';

export const mapPastasColecaoDTOparaExportaPastasColecaoDTO = (
  pastas: PastaColecaoDTO[]
): ExportPastaColecaoDTO[] => {
  return pastas.map((pasta) => ({
    nome: pasta.nome,
  }));
};
