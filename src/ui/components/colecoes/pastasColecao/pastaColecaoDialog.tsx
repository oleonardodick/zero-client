import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import { PastaColecaoForm } from './pastaColecaoForm';

interface PastaColecaoProps {
  pasta?: PastaColecaoDTO;
  formId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  colecao_id: string;
}

export const PastaColecaoDialog = ({
  pasta,
  formId,
  open,
  setOpen,
  colecao_id,
}: PastaColecaoProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pastas</DialogTitle>
          <DialogDescription>Pastas de requisições</DialogDescription>
        </DialogHeader>
        <PastaColecaoForm
          pasta={pasta}
          formId={formId}
          colecao_id={colecao_id}
        />
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
