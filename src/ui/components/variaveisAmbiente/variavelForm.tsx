import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CrudResult, IVariavelAmbiente } from '@/shared/types';

interface VariavelFormProps {
  formId: string;
  variavel?: IVariavelAmbiente;
  onRefazerBusca: () => void;
}

export const VariavelForm: React.FC<VariavelFormProps> = ({
  formId,
  variavel,
  onRefazerBusca,
}) => {
  const { register, handleSubmit } = useForm<IVariavelAmbiente>({
    defaultValues: {
      nome: '',
      valor: '',
      ...variavel,
    },
  });

  const onSubmit: SubmitHandler<IVariavelAmbiente> = async (data) => {
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
      onRefazerBusca();
    } catch (erro) {
      console.log(erro);
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
