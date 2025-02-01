import { ColecaoDTO } from '@/dtos/colecao.dto';
import { mapPastasColecaoDTOparaExportaPastasColecaoDTO } from './pastaColecao.mapper';
import { JsonColecao } from '@/shared/types';

export const mapColecaoDTOParaExportaColecaoDTO = (
  colecao: ColecaoDTO
): JsonColecao => {
  return {
    client: 'Zero Client',
    id: colecao.id || '',
    nome: colecao.nome,
    pastas: mapPastasColecaoDTOparaExportaPastasColecaoDTO(colecao.pastas),
  };
};
