import Endpoint from './endpoint';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { useState } from 'react';
const Atividade = () => {
  const [filtro, setFiltro] = useState('');
  const buscaRequisicoes = async (): Promise<RequisicaoDTO[]> => {
    return await window.electron.buscaUltimasRequisicoes();
  };
  const requisicoes = useQuery({
    queryKey: ['ultimasRequisicoes'],
    queryFn: buscaRequisicoes,
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
