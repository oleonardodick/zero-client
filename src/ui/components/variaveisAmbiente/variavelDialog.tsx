import { VariavelAmbienteDTO } from '@/dtos/variavelAmbiente.dto';
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
  variavel?: VariavelAmbienteDTO;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Variável de Ambiente</DialogTitle>
          <DialogDescription>
            Variáveis de ambiente para utilizar nas requisições
          </DialogDescription>
        </DialogHeader>
        <VariavelForm formId={formId} variavel={variavel} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default" size="lg" type="submit" form={formId}>
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
