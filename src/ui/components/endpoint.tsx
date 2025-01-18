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
import useRequisicaoStore from '../store/requisicaoStore';
import { DeleteDialog } from './deleteDialog';
import { RenameDialog } from './renameDialog';
import { enviarRequisicao } from '../communication/requisicao';
// import useRespostaStore from '../store/respostaStore';

interface EndpointProps {
  requisicao: RequisicaoDTO;
}

const Endpoint = ({ requisicao }: EndpointProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const inicializaResposta = useRespostaStore(
  //   (state) => state.inicializaResposta
  // );

  const handleExcluirRequisicao = async () => {
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

  const handleRenomear = async (novoNome: string) => {
    const novaRequisicao = requisicao;
    novaRequisicao.nome = novoNome;
    const retorno = await window.electron.atualizaRequisicao(novaRequisicao);
    if (retorno.sucesso) {
      queryClient.invalidateQueries({ queryKey: ['ultimasRequisicoes'] });
    }
  };

  const handleExecutar = async () => {
    const resposta = await enviarRequisicao(requisicao);
    if (requisicao.id) {
      const result = await window.electron.atualizaResposta(
        resposta,
        requisicao.id
      );
      console.log(resposta, result);
      navigate(`/requisicao/modificar/${requisicao.id}`);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="hover:bg-gray-600 cursor-pointer p-2 rounded-md group/endpoint relative">
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
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisIcon className="invisible group-hover/endpoint:visible absolute bottom-0 right-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-stone-600 text-stone-200 hover:*:bg-stone-500 hover:*:cursor-pointer">
                <DropdownMenuItem onClick={handleExecutar}>
                  Executar
                </DropdownMenuItem>
                <DropdownMenuItem>Salvar na Coleção</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
                  Renomear
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteDialog
              mensagem={`Deseja realmente excluir a requisição ${requisicao.nome}?`}
              handleDelete={handleExcluirRequisicao}
              open={deleteDialogOpen}
              setOpen={setDeleteDialogOpen}
            />
            <RenameDialog
              nome={requisicao.nome}
              open={renameDialogOpen}
              setOpen={setRenameDialogOpen}
              handleAtualizar={handleRenomear}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-stone-800">
          <p>{requisicao.url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Endpoint;
