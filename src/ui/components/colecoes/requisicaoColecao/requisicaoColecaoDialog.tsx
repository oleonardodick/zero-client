import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { RequisicaoColecaoForm } from './requisicaoColecaoForm';

interface RequisicaoColecaoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  requisicao?: RequisicaoDTO;
  colecao_id: string;
  formId: string;
}

export const RequisicaoColecaoDialog = ({
  open,
  setOpen,
  requisicao,
  colecao_id,
  formId,
}: RequisicaoColecaoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Requisicao</DialogTitle>
          <DialogDescription>
            Informe um nome para a requisição
          </DialogDescription>
        </DialogHeader>
        <RequisicaoColecaoForm
          requisicao={requisicao}
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
