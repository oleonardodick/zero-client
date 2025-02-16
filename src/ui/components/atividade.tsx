import Endpoint from './endpoint';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { useState } from 'react';
import { BuscaUltimasRequisicoes } from '../services/requisicao.service';
const Atividade = () => {
  const [filtro, setFiltro] = useState('');

  const requisicoes = useQuery({
    queryKey: ['ultimasRequisicoes'],
    queryFn: BuscaUltimasRequisicoes,
  });
  const listaFiltrada = requisicoes.data?.filter(
    (r) =>
      r.nome.toLowerCase().trim().includes(filtro.toLowerCase()) ||
      r.url.toLowerCase().trim().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Input
          placeholder="Filtrar atividade"
          className="rounded-2xl"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      <ul>
        {listaFiltrada?.map((requisicao) => (
          <li key={requisicao.id}>
            <Endpoint requisicao={requisicao} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Atividade;
