import { ChevronDownIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import Pasta from './pasta';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ColecaoDialog } from './colecaoDialog';
import { ColecaoDTO } from '@/dtos/colecao.dto';
import { DeleteDialog } from '../deleteDialog';
import { excluirColecao } from '@/ui/services/colecoes.service';
import { useQueryClient } from '@tanstack/react-query';

interface ColeacaoProps {
  colecao: ColecaoDTO;
}

const Colecao = ({ colecao }: ColeacaoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (colecao.id) {
      const resultado = await excluirColecao(colecao.id);
      if (resultado.sucesso)
        queryClient.invalidateQueries({ queryKey: ['listaColecoes'] });
    }
  };

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className="group relative flex gap-2 text-stone-950 data-[state=open]:font-bold hover:bg-stone-400/40 cursor-pointer p-2 w-full
       dark:text-stone-200 dark:hover:bg-stone-800/30"
        >
          <span className="hidden lg:block">
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          {colecao.nome}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon className="invisible group-hover:visible absolute right-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Nova Requisição</DropdownMenuItem>
              <DropdownMenuItem>Nova Pasta</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenEdit(!openEdit)}>
                Renomear
              </DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuItem>Exportar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenDelete(!openDelete)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4">
          <Pasta nome="Usuarios" />
          <Pasta nome="Materiais" />
          <Pasta nome="Empresas" />
        </CollapsibleContent>
      </Collapsible>
      <ColecaoDialog
        open={openEdit}
        setOpen={setOpenEdit}
        formId="formColecao"
        colecao={colecao}
      />
      <DeleteDialog
        mensagem={`Deseja excluir a coleção ${colecao.nome}?`}
        open={openDelete}
        setOpen={setOpenDelete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Colecao;
