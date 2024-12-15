import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { BearerAuthentication } from './bearer';
import { BasicAuthentication } from './basic';
import useRequisicaoStore from '@/ui/store/requisicaoStore';

export const Autenticacao = () => {
  const tipoAutenticacao = useRequisicaoStore(
    (state) => state.requisicao.autenticacao?.tipo
  );
  const setTipoAutenticacao = useRequisicaoStore(
    (state) => state.setTipoAutenticacao
  );

  return (
    <div className="grid gap-5 p-4">
      <div className="flex items-center gap-4">
        <Label>Tipo</Label>
        <Select
          defaultValue={tipoAutenticacao}
          onValueChange={setTipoAutenticacao}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Nenhum</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="bearer">Bearer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {tipoAutenticacao === 'none' && (
          <h1>Nenhuma autenticação selecionada</h1>
        )}
        {tipoAutenticacao === 'basic' && <BasicAuthentication />}
        {tipoAutenticacao === 'bearer' && <BearerAuthentication />}
      </div>
    </div>
  );
};
