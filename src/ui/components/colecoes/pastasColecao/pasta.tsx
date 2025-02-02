import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import { EllipsisIcon, FolderClosedIcon, FolderOpenIcon } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { RequisicaoDialog } from '../requisicaoDialog';
import { RequisicaoPasta } from './requisicaoPasta';

interface PastaProps {
  pasta: PastaColecaoDTO;
}
export const Pasta = ({ pasta }: PastaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCadastraColecaoPasta, setOpenCadastraColecaoPasta] =
    useState(false);
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
              <DropdownMenuItem
                onClick={() => setOpenCadastraColecaoPasta(true)}
              >
                Nova Requisição
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Renomear</DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuItem>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4">
          <RequisicaoPasta colecao_id={pasta.colecao_id} pasta_id={pasta.id} />
        </CollapsibleContent>
      </Collapsible>
      <RequisicaoDialog
        colecao_id={pasta.colecao_id}
        formId="requisicaoPastaForm"
        open={openCadastraColecaoPasta}
        setOpen={setOpenCadastraColecaoPasta}
        pasta_id={pasta.id}
      />
    </>
  );
};
