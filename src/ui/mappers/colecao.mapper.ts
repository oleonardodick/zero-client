import { ColecaoDTO, ExportaColecaoDTO } from '@/dtos/colecao.dto';
import { mapPastasColecaoDTOparaExportaPastasColecaoDTO } from './pastaColecao.mapper';

export const mapColecaoDTOParaExportaColecaoDTO = (
  colecao: ColecaoDTO
): ExportaColecaoDTO => {
  return {
    client: 'Zero Client',
    nome: colecao.nome,
    pastas: mapPastasColecaoDTOparaExportaPastasColecaoDTO(colecao.pastas),
  };
};
