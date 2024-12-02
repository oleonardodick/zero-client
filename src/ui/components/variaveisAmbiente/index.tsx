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
import { useEffect, useState } from 'react';
import { VariavelDialog } from './variavelDialog';
import { CrudResult, IVariavelAmbiente } from '@/shared/types';

const VariaveisAmbiente = () => {
  const [variaveis, setVariaveis] = useState<IVariavelAmbiente[]>([]);
  const [refazerBusca, setRefazerBusca] = useState<boolean>(true);

  const handleExcluir = async (e: React.FormEvent, nome: string) => {
    e.preventDefault();
    const resultado: CrudResult = await window.electron.excluiVariavelAmbiente(
      nome
    );
    console.log(resultado);
    setRefazerBusca(true);
  };

  useEffect(() => {
    if (refazerBusca) {
      const buscaVariaveis = async () => {
        setVariaveis(await window.electron.buscaTodasVariaveisAmbiente());
        setRefazerBusca(false);
      };
      buscaVariaveis();
    }
  }, [refazerBusca]);

  const handleRefazerBusca = () => {
    setRefazerBusca(true);
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
          {variaveis.map((variavel) => (
            <VariavelDialog
              formId="formVariavel"
              variavel={variavel}
              onRefazerBusca={handleRefazerBusca}
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
      <VariavelDialog
        formId="formVariaveis"
        onRefazerBusca={handleRefazerBusca}
      >
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
