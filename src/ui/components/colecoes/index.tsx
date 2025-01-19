import { useState } from 'react';
import { Input } from '../ui/input';
import Colecao from './colecao';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { ColecaoDTO } from '@/dtos/colecao.dto';
import { useQuery } from '@tanstack/react-query';

const Colecoes = () => {
  const [filtro, setFiltro] = useState('');

  const buscaColecoes = async (): Promise<ColecaoDTO[]> => {
    return await window.electron.buscaColecoes();
  };

  const colecoes = useQuery({
    queryKey: ['listaColecoes'],
    queryFn: buscaColecoes,
  });

  const colecoesFiltradas = colecoes.data?.filter((c) =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center gap-1">
          <Input
            placeholder="Filtrar coleções"
            className="rounded-2xl border-opacity-25 focus:border-opacity-75"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuIcon className="hover:cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Nova coleção</DropdownMenuItem>
                  <DropdownMenuItem>Importar</DropdownMenuItem>
                  <DropdownMenuItem>Exportar coleções</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ul>
          {colecoesFiltradas?.map((colecao) => (
            <li key={colecao.id}>
              <Colecao nome={colecao.nome} />
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
};

export default Colecoes;
