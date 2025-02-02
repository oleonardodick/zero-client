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
import { RequisicaoForm } from './requisicaoForm';

interface RequisicaoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colecao_id: string;
  pasta_id?: string;
  formId: string;
}

export const RequisicaoDialog = ({
  open,
  setOpen,
  colecao_id,
  pasta_id,
  formId,
}: RequisicaoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Requisição</DialogTitle>
          <DialogDescription>
            Informe um nome para a requisição
          </DialogDescription>
        </DialogHeader>
        <RequisicaoForm
          formId={formId}
          colecao_id={colecao_id}
          pasta_id={pasta_id}
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
