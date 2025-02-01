import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import { JsonPastas } from '@/shared/types';

export const mapPastasColecaoDTOparaExportaPastasColecaoDTO = (
  pastas: PastaColecaoDTO[]
): JsonPastas[] => {
  return pastas.map((pasta) => ({
    id: pasta.id || '',
    nome: pasta.nome,
  }));
};
