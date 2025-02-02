import { BuscaRequisicoesColecao } from '@/ui/services/requisicao.service';
import { useQuery } from '@tanstack/react-query';
import Endpoint from '../endpoint';

interface RequisicaoColecaoProp {
  colecao_id: string;
}
export const RequisicaoColecao = ({ colecao_id }: RequisicaoColecaoProp) => {
  const requisicoes = useQuery({
    queryKey: [`requisicoesColecao${colecao_id}`],
    queryFn: () => BuscaRequisicoesColecao(colecao_id),
  });
  return requisicoes.data?.map((requisicao) => (
    <Endpoint
      key={requisicao.id}
      requisicao={requisicao}
      endpointColecao={true}
    />
  ));
};
