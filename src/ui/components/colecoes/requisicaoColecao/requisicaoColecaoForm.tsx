import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import {
  AtualizaRequisicao,
  CriaRequisicao,
} from '@/ui/services/requisicao.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { TipoRequisicao } from '@/ui/enums/tipoRequisicao.enum';

interface RequisicaoColecaoFormProps {
  formId: string;
  requisicao?: RequisicaoDTO;
  colecao_id: string;
}

export const RequisicaoColecaoForm = ({
  formId,
  requisicao,
  colecao_id,
}: RequisicaoColecaoFormProps) => {
  const { control, register, handleSubmit } = useForm<RequisicaoDTO>({
    defaultValues: {
      nome: '',
      tipo: TipoRequisicao.GET,
      colecao_id: colecao_id,
      ...requisicao,
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CriaRequisicao,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`requisicoesColecao${colecao_id}`],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: AtualizaRequisicao,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`requisicoesColecao${colecao_id}`],
      });
    },
  });

  const onSubmit: SubmitHandler<RequisicaoDTO> = (data) => {
    if (requisicao) {
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
