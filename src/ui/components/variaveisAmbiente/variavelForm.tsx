import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { IVariavelAmbiente } from '../../interfaces/IVariaveisAmbiente';

interface VariavelFormProps {
  formId: string;
  variavel?: IVariavelAmbiente;
}

export const VariavelForm: React.FC<VariavelFormProps> = ({
  formId,
  variavel,
}) => {
  const { register, handleSubmit } = useForm<IVariavelAmbiente>({
    defaultValues: {
      nome: '',
      valor: '',
      ...variavel,
    },
  });

  const onSubmit: SubmitHandler<IVariavelAmbiente> = (data) => {
    console.log(data);
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
            <Label htmlFor="valor">Valor</Label>
            <Input {...register('valor')} placeholder="Valor" />
          </div>
        </div>
      </div>
    </form>
  );
};
