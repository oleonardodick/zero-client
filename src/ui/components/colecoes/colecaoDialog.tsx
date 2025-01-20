import { ColecaoDTO } from '@/dtos/colecao.dto';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ColecaoForm } from './colecaoForm';

interface ColecaoDialogProps {
  colecao?: ColecaoDTO;
  formId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ColecaoDialog = ({
  colecao,
  formId,
  open,
  setOpen,
}: ColecaoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Coleções</DialogTitle>
          <DialogDescription>Coleções de requisições</DialogDescription>
        </DialogHeader>
        <ColecaoForm formId={formId} colecao={colecao} />
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
