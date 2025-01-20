import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColecaoDTO } from '@/dtos/colecao.dto';
import { atualizarColecao, criarColecao } from '@/ui/services/colecoes.service';

interface ColecaoFormProps {
  formId: string;
  colecao?: ColecaoDTO;
}

export const ColecaoForm = ({ formId, colecao }: ColecaoFormProps) => {
  const { register, handleSubmit } = useForm<ColecaoDTO>({
    defaultValues: {
      nome: '',
      ...colecao,
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: criarColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listaColecoes'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: atualizarColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listaColecoes'] });
    },
  });

  const onSubmit: SubmitHandler<ColecaoDTO> = (data) => {
    if (colecao) {
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
