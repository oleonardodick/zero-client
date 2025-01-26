import { useQuery } from '@tanstack/react-query';
import { BuscaPastasColecao } from '@/ui/services/pastasColecao.service';
import { Pasta } from './pasta';

interface PastasColecaoProps {
  colecao_id: string;
}
export const PastasColecao = ({ colecao_id }: PastasColecaoProps) => {
  const pastas = useQuery({
    queryKey: [`pastasColecao${colecao_id}`],
    queryFn: () => BuscaPastasColecao(colecao_id),
  });

  return pastas.data?.map((pasta) => <Pasta pasta={pasta} key={pasta.id} />);
};
