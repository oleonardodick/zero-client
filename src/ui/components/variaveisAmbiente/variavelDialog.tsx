import { IVariavelAmbiente } from '@/shared/types';
import { Button } from '../ui/button';
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
import { VariavelForm } from './variavelForm';

interface VariavelDialogProps {
  variavel?: IVariavelAmbiente;
  formId: string;
  children: React.ReactNode;
  onRefazerBusca: () => void;
}

export const VariavelDialog: React.FC<VariavelDialogProps> = ({
  variavel,
  formId,
  children,
  onRefazerBusca,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800 text-zinc-300">
        <DialogHeader>
          <DialogTitle>Variável de Ambiente</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Variáveis de ambiente para utilizar nas requisições
          </DialogDescription>
        </DialogHeader>
        <VariavelForm
          formId={formId}
          variavel={variavel}
          onRefazerBusca={onRefazerBusca}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-zinc-800"
              type="submit"
              form={formId}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
