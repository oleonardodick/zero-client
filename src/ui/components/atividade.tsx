import Endpoint from './endpoint';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
    <TooltipProvider>
      <div>
        <div className="flex items-center gap-1">
          <Input
            placeholder="Filtrar atividade"
            className="rounded-2xl"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuIcon className="hover:cursor-pointer text-stone-600 dark:text-stone-200" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Importar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ul>
          {listaFiltrada?.map((requisicao) => (
            <li key={requisicao.id}>
              <Endpoint requisicao={requisicao} />
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
};

export default Atividade;
