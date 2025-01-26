import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PastaColecaoDTO } from '@/dtos/pastaColecao.dto';
import {
  AtualizaPastaColecao,
  CriaPastasColecao,
} from '@/ui/services/pastasColecao.service';

interface PastaColecaoProps {
  formId: string;
  pasta?: PastaColecaoDTO;
  colecao_id: string;
}

export const PastaColecaoForm = ({
  formId,
  pasta,
  colecao_id,
}: PastaColecaoProps) => {
  const { register, handleSubmit } = useForm<PastaColecaoDTO>({
    defaultValues: {
      nome: '',
      colecao_id: colecao_id,
      ...pasta,
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CriaPastasColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`pastasColecao${pasta?.colecao_id}`],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: AtualizaPastaColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`pastasColecao${pasta?.colecao_id}`],
      });
    },
  });

  const onSubmit: SubmitHandler<PastaColecaoDTO> = (data) => {
    if (pasta) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input {...register('nome')} placeholder="Nome" />
          </div>
        </div>
      </div>
    </form>
  );
};
