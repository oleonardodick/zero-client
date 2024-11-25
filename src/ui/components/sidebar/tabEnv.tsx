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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { IVariavelAmbiente } from '@/ui/interfaces/IVariaveisAmbiente';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

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

const TabEnv: React.FC = () => {
  const [variaveis, setVariaveis] =
    useState<IVariavelAmbiente[]>(variaveisIniciais);

  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');

  const handleExcluir = (e: React.FormEvent, nome: string) => {
    e.preventDefault();
    setVariaveis(variaveis.filter((variavel) => variavel.nome !== nome));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('vai salvar');
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
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-zinc-800 w-full">
            <PlusCircleIcon /> Adicionar
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-800 text-zinc-300">
          <DialogHeader>
            <DialogTitle>Variável de Ambiente</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Variáveis de ambiente para utilizar nas requisições
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    id="valor"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-zinc-800"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TabEnv;
