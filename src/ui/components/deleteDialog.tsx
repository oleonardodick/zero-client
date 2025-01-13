import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface DeleteDialogProps {
  mensagem: string;
  handleDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const DeleteDialog = ({
  mensagem,
  handleDelete,
  open,
  setOpen,
}: DeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-stone-700 text-stone-200">
        <AlertDialogHeader>
          <AlertDialogTitle>{mensagem}</AlertDialogTitle>
          <AlertDialogDescription className="text-stone-400">
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
