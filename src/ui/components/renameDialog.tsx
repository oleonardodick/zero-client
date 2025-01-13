import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface RenameDialogProps {
  nome: string;
  handleAtualizar: (novoNome: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const RenameDialog = ({
  nome,
  handleAtualizar,
  open,
  setOpen,
}: RenameDialogProps) => {
  const [inputValue, setInputValue] = useState(nome);
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAtualizar(inputValue);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-stone-700 text-gray-100 border-stone-500">
        <DialogHeader>
          <DialogTitle>Renomear requisição</DialogTitle>
          <DialogDescription className="text-gray-400">
            Informe o novo nome para a requisição
          </DialogDescription>
        </DialogHeader>
        <form id="formRename" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nome"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              form="formRename"
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
