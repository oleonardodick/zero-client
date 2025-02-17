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
    <div className="flex flex-col gap-2 h-full">
      <div className="h-9">
        <Input
          placeholder="Filtrar atividade"
          className="rounded-2xl"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      <div className="h-[calc(100%-2.25rem)] w-full overflow-auto scrollbar-sidebar">
        {listaFiltrada?.map((requisicao) => (
          <div key={requisicao.id} className="text-sm">
            <Endpoint requisicao={requisicao} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Atividade;
