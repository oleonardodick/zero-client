import Endpoint from './endpoint';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { useQuery } from '@tanstack/react-query';

const Atividade = () => {
  const buscaRequisicoes = async (): Promise<RequisicaoDTO[]> => {
    return await window.electron.buscaUltimasRequisicoes();
  };

  const requisicoes = useQuery({
    queryKey: ['ultimasRequisicoes'],
    queryFn: buscaRequisicoes,
  });

  return (
    <div>
      <ul>
        {requisicoes.data?.map((requisicao) => (
          <li key={requisicao.id}>
            <Endpoint requisicao={requisicao} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Atividade;
