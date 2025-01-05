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
}

export const VariavelDialog = ({
  variavel,
  formId,
  children,
}: VariavelDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-stone-700 text-gray-100 border-stone-500">
        <DialogHeader>
          <DialogTitle>Variável de Ambiente</DialogTitle>
          <DialogDescription className="text-gray-400">
            Variáveis de ambiente para utilizar nas requisições
          </DialogDescription>
        </DialogHeader>
        <VariavelForm formId={formId} variavel={variavel} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="lg" type="submit" form={formId}>
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
