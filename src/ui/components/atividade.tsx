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
          <li>
            <Endpoint
              metodo={requisicao.tipo.toUpperCase()}
              url={requisicao.url}
              dataRequisicao="9 dias atrás"
            />
          </li>
        ))}
        <li>
          <Endpoint
            metodo="GET"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="POST"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="PUT"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="DELETE"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
      </ul>
    </div>
  );
};

export default Atividade;
