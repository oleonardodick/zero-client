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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColecaoDialog } from './colecaoDialog';
import { buscarColecoes } from '@/ui/services/colecoes.service';

const Colecoes = () => {
  const [filtro, setFiltro] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const colecoes = useQuery({
    queryKey: ['listaColecoes'],
    queryFn: buscarColecoes,
  });

  const colecoesFiltradas = colecoes.data?.filter((c) =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleImportarColecao = async () => {
    const resultado = await window.electron.importarJson();
    if (resultado.sucesso) {
      queryClient.invalidateQueries({ queryKey: ['listaColecoes'] });
    } else {
      alert(resultado.erro);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
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
                  <DropdownMenuItem onClick={() => setOpenDialog(!openDialog)}>
                    Nova coleção
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleImportarColecao}>
                    Importar coleção
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
          <ColecaoDialog
            formId="colecaoForm"
            open={openDialog}
            setOpen={setOpenDialog}
          />
        </div>
        <ul>
          {colecoesFiltradas?.map((colecao) => (
            <li key={colecao.id}>
              <Colecao colecao={colecao} />
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
};

export default Colecoes;
