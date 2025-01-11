import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CrudResult } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atualizaVariavelAmbiente } from '@/ui/services/variavelAmbiente.service';
import { VariavelAmbienteDTO } from '@/dtos/variavelAmbiente.dto';

interface VariavelFormProps {
  formId: string;
  variavel?: VariavelAmbienteDTO;
}

export const VariavelForm = ({ formId, variavel }: VariavelFormProps) => {
  const { register, handleSubmit } = useForm<VariavelAmbienteDTO>({
    defaultValues: {
      nome: '',
      valor: '',
      ...variavel,
    },
  });

  const queryClient = useQueryClient();

  const criaVariavelAmbiente = async (data: VariavelAmbienteDTO) => {
    try {
      let resultado: CrudResult;

      if (variavel) {
        resultado = await window.electron.atualizaVariavelAmbiente(
          data.nome,
          data.valor
        );
      } else {
        resultado = await window.electron.criaVariavelAmbiente(
          data.nome,
          data.valor
        );
      }
      console.log(resultado);
    } catch (erro) {
      console.log(erro);
    }
  };

  const createMutation = useMutation({
    mutationFn: criaVariavelAmbiente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variaveisAmbiente'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: atualizaVariavelAmbiente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variaveisAmbiente'] });
    },
  });

  const onSubmit: SubmitHandler<VariavelAmbienteDTO> = (data) => {
    if (variavel) {
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
            <Input
              {...register('nome')}
              placeholder="Nome"
              disabled={variavel?.nome !== undefined}
            />
          </div>
          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input {...register('valor')} placeholder="Valor" />
          </div>
        </div>
      </div>
    </form>
  );
};
