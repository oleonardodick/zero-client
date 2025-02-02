import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { TipoRequisicao } from '@/ui/enums/tipoRequisicao.enum';
import { CriaRequisicao } from '@/ui/services/requisicao.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface RequisicaoFormProps {
  formId: string;
  colecao_id: string;
  pasta_id?: string;
}

export const RequisicaoForm = ({
  formId,
  colecao_id,
  pasta_id,
}: RequisicaoFormProps) => {
  const { control, register, handleSubmit } = useForm<RequisicaoDTO>({
    defaultValues: {
      nome: '',
      tipo: TipoRequisicao.GET,
      colecao_id: colecao_id,
      pasta_id: pasta_id,
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CriaRequisicao,
    onSuccess: () => {
      if (pasta_id) {
        queryClient.invalidateQueries({
          queryKey: [`requisicoesPasta${pasta_id}`],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [`requisicoesColecao${colecao_id}`],
        });
      }
    },
  });

  const onSubmit: SubmitHandler<RequisicaoDTO> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input {...register('nome')} placeholder="Nome" />
          </div>
          <div>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="tipo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={TipoRequisicao.GET}>GET</SelectItem>
                      <SelectItem value={TipoRequisicao.POST}>POST</SelectItem>
                      <SelectItem value={TipoRequisicao.PUT}>PUT</SelectItem>
                      <SelectItem value={TipoRequisicao.PATCH}>
                        PATCH
                      </SelectItem>
                      <SelectItem value={TipoRequisicao.DELETE}>
                        DELETE
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
