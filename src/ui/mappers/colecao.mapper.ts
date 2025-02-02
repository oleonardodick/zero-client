import { ColecaoDTO } from '@/dtos/colecao.dto';
import { JsonColecao } from '@/shared/types';
import { BuscaPastasColecao } from '../services/pastasColecao.service';
import { BuscaRequisicoesColecao } from '../services/requisicao.service';

export const mapColecaoDTOParaExportaColecaoDTO = async (
  colecao: ColecaoDTO
): Promise<JsonColecao> => {
  const pastasColecao = await BuscaPastasColecao(colecao.id);
  const requisicoesColecao = await BuscaRequisicoesColecao(colecao.id);
  return {
    client: 'Zero Client',
    id: colecao.id || '',
    nome: colecao.nome,
    pastas: pastasColecao,
    requisicoes: requisicoesColecao,
  };
};
