import { BuscaRequisicoesPasta } from '@/ui/services/requisicao.service';
import { useQuery } from '@tanstack/react-query';
import Endpoint from '../../endpoint';

interface RequisicaoPastaProp {
  pasta_id: string;
  colecao_id: string;
}
export const RequisicaoPasta = ({ pasta_id }: RequisicaoPastaProp) => {
  const requisicoes = useQuery({
    queryKey: [`requisicoesPasta${pasta_id}`],
    queryFn: () => BuscaRequisicoesPasta(pasta_id),
  });
  return requisicoes.data?.map((requisicao) => (
    <Endpoint
      key={requisicao.id}
      requisicao={requisicao}
      endpointPasta={true}
    />
  ));
};
