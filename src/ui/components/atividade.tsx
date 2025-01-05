import { useEffect, useState } from 'react';
import Endpoint from './endpoint';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';

const Atividade = () => {
  const [requisicoes, setRequisicoes] = useState<RequisicaoDTO[]>([]);

  useEffect(() => {
    const buscaRequisicoes = async () => {
      setRequisicoes(await window.electron.buscaUltimasRequisicoes());
    };
    buscaRequisicoes();
  }, []);
  return (
    <div>
      <ul>
        {requisicoes.map((requisicao) => (
          <li key={requisicao.id}>
            <Endpoint requisicao={requisicao} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Atividade;
