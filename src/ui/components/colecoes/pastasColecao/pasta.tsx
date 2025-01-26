import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import { EllipsisIcon, FolderClosedIcon, FolderOpenIcon } from 'lucide-react';
import EndpointsColecao from '../endpointsColecao';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface PastaProps {
  pasta: PastaColecaoDTO;
}
export const Pasta = ({ pasta }: PastaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className="group relative flex gap-2 text-stone-950 data-[state=open]:font-bold hover:bg-stone-400/40 cursor-pointer p-2 w-full
       dark:text-stone-200 dark:hover:bg-stone-800/30"
        >
          <span className="hidden lg:block">
            {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}
          </span>
          {pasta.nome}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon className="invisible group-hover:visible absolute right-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nova Requisição</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Renomear</DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuItem>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4">
          <EndpointsColecao />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
