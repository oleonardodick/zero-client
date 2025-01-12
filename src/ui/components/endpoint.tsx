import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { EllipsisIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import useRequisicaoStore from '../store/requisicaoStore';

interface EndpointProps {
  requisicao: RequisicaoDTO;
}

const Endpoint = ({ requisicao }: EndpointProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="hover:bg-gray-600 cursor-pointer p-2 rounded-md group/endpoint">
            <Link to={`/requisicao/modificar/${requisicao.id}`}>
              <div className="flex flex-col lg:flex-row gap-2 mb-2">
                <span
                  data-method={requisicao.tipo.toUpperCase()}
                  className="rounded-lg px-2 font-bold 
                           data-[method=GET]:bg-blue-500 
                           data-[method=POST]:bg-green-500 
                           data-[method=PUT]:bg-cyan-500 
                           data-[method=DELETE]:bg-red-500"
                >
                  {requisicao.tipo.toUpperCase()}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {requisicao.nome}
                </span>
              </div>
              <div className="flex justify-between">
                {requisicao.data && (
                  <p>
                    {formatDistanceToNowStrict(requisicao.data, {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </p>
                )}
                <DropdownMenu onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <EllipsisIcon
                      className={`group-hover/endpoint:visible ${
                        dropdownOpen ? 'visible' : 'invisible'
                      }`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-stone-600 text-stone-200 hover:*:bg-stone-500 hover:*:cursor-pointer">
                    <DropdownMenuItem>Executar</DropdownMenuItem>
                    <DropdownMenuItem>Salvar na Coleção</DropdownMenuItem>
                    <DropdownMenuItem>Renomear</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteDialog
                  requisicao={requisicao}
                  open={deleteDialogOpen}
                  setOpen={setDeleteDialogOpen}
                />
              </div>
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-stone-800 ${dropdownOpen ? 'invisible' : ''}`}
        >
          <p>{requisicao.url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DeleteDialogProps {
  requisicao: RequisicaoDTO;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteDialog = ({ requisicao, open, setOpen }: DeleteDialogProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleExcluir = async () => {
    const requisicaoAberta = useRequisicaoStore.getState().requisicao;
    if (requisicao.id) {
      const retorno = await window.electron.excluiRequisicao(requisicao.id);
      if (retorno.sucesso) {
        queryClient.invalidateQueries({ queryKey: ['ultimasRequisicoes'] });
        if (requisicaoAberta.id === requisicao.id)
          navigate('/requisicao/cadastrar');
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-stone-700 text-stone-200">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deletar a requisição {requisicao.nome}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-stone-400">
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleExcluir}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Endpoint;
