import { PlusCircleIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useState } from 'react';
import { IVariavelAmbiente } from '@/ui/interfaces/IVariaveisAmbiente';
import { VariavelDialog } from './variavelDialog';

const variaveisIniciais: IVariavelAmbiente[] = [
  {
    nome: 'URL',
    valor: 'http://localhost:3000',
  },
  {
    nome: 'Teste',
    valor: 'variavelTeste',
  },
];

const VariaveisAmbiente: React.FC = () => {
  const [variaveis, setVariaveis] =
    useState<IVariavelAmbiente[]>(variaveisIniciais);

  const handleExcluir = (e: React.FormEvent, nome: string) => {
    e.preventDefault();
    setVariaveis(variaveis.filter((variavel) => variavel.nome !== nome));
  };

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden lg:table-cell">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variaveis.map((variavel) => (
            <VariavelDialog formId="formVariavel" variavel={variavel}>
              <TableRow>
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
        <Button variant="outline" className="text-zinc-800 w-full">
          <PlusCircleIcon /> Adicionar
        </Button>
      </VariavelDialog>
    </div>
  );
};

export default VariaveisAmbiente;
