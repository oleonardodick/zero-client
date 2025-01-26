import { ChevronDownIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { PastasColecao } from './pastasColecao';
import { ColecaoDialog } from './colecaoDialog';
import { DeleteDialog } from '../deleteDialog';
import { criarColecao, excluirColecao } from '@/ui/services/colecoes.service';
import { useQueryClient } from '@tanstack/react-query';
import { ColecaoDTO } from '@/dtos/colecao.dto';
import { mapColecaoDTOParaExportaColecaoDTO } from '@/ui/mappers/colecao.mapper';
import { PastaColecaoDialog } from './pastasColecao/pastaColecaoDialog';
import { CriaPastasColecao } from '@/ui/services/pastasColecao.service';

interface ColeacaoProps {
  colecao: ColecaoDTO;
}

const Colecao = ({ colecao }: ColeacaoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCadastraPastaColecao, setOpenCadastraPastaColecao] =
    useState(false);
  const queryClient = useQueryClient();

  if (!colecao.id) {
    return <p>Erro na busca da coleção</p>;
  }

  const handleDelete = async () => {
    if (colecao.id) {
      const resultado = await excluirColecao(colecao.id);
      if (resultado.sucesso)
        queryClient.invalidateQueries({ queryKey: ['listaColecoes'] });
    }
  };

  const handleExportaColecao = () => {
    const colecaoExportar = mapColecaoDTOParaExportaColecaoDTO(colecao);
    window.electron.salvarJson(colecaoExportar, colecaoExportar.nome);
  };

  const handleDuplicarColecao = async () => {
    const novaColecao: ColecaoDTO = {
      ...colecao,
      nome: `${colecao.nome} Copy`,
    };
    const resultado = await criarColecao(novaColecao);
    if (resultado.sucesso && resultado.idCriado) {
      const idColecao: string = resultado.idCriado;
      novaColecao.pastas.forEach((pasta) => {
        CriaPastasColecao({
          ...pasta,
          colecao_id: idColecao,
        });
      });
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
              <DropdownMenuItem
                onClick={() => setOpenCadastraPastaColecao(true)}
              >
                Nova Pasta
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenEdit(!openEdit)}>
                Renomear
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicarColecao}>
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportaColecao}>
                Exportar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenDelete(!openDelete)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4">
          <PastasColecao colecao_id={colecao.id} />
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
      <PastaColecaoDialog
        formId="formPastaColecao"
        open={openCadastraPastaColecao}
        setOpen={setOpenCadastraPastaColecao}
        colecao_id={colecao.id}
      />
    </>
  );
};

export default Colecao;
