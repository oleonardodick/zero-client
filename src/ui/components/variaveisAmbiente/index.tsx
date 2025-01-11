import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { VariavelDialog } from './variavelDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { excluiVariavelAmbiente } from '@/ui/services/variavelAmbiente.service';
import { VariavelAmbienteDTO } from '@/dtos/variavelAmbiente.dto';

const VariaveisAmbiente = () => {
  const queryClient = useQueryClient();

  const buscaVariaveis = async (): Promise<VariavelAmbienteDTO[]> => {
    return await window.electron.buscaTodasVariaveisAmbiente();
  };

  const variaveis = useQuery({
    queryKey: ['variaveisAmbiente'],
    queryFn: buscaVariaveis,
  });

  const mutation = useMutation({
    mutationFn: excluiVariavelAmbiente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variaveisAmbiente'] });
    },
  });

  const handleExcluir = async (e: React.FormEvent, nome: string) => {
    e.preventDefault();
    mutation.mutate(nome);
  };

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray-400 [&>th]:text-gray-400">
            <TableHead>Nome</TableHead>
            <TableHead className="hidden lg:table-cell">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variaveis.data?.map((variavel) => (
            <VariavelDialog
              formId="formVariavel"
              variavel={variavel}
              key={variavel.nome}
            >
              <TableRow className="[&>td]:text-gray-100 [&>td]:hover:bg-gray-600 border-gray-400">
                <TableCell>{variavel.nome}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {variavel.valor}
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    size="icon"
                    className="text-zinc-300"
                    onClick={(e) => handleExcluir(e, variavel.nome)}
                  >
                    <XIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </VariavelDialog>
          ))}
        </TableBody>
      </Table>
      <VariavelDialog formId="formVariaveis">
        <Button
          variant="link"
          className="text-indigo-500 tracking-wider text-lg w-full"
        >
          + Adicionar
        </Button>
      </VariavelDialog>
    </div>
  );
};

export default VariaveisAmbiente;
