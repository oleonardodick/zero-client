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
import { useAutenticacaoStore } from '@/ui/store/autenticacaoStore';
import { useEffect } from 'react';

export const Autenticacao = () => {
  const autenticacao = useAutenticacaoStore((state) => state.autenticacao);
  const setTipo = useAutenticacaoStore((state) => state.setTipo);
  const fetchAutenticacao = useAutenticacaoStore(
    (state) => state.fetchAutenticacao
  );
  const requisicao = useRequisicaoStore((state) => state.requisicao);

  useEffect(() => {
    fetchAutenticacao(requisicao.id);
  }, [fetchAutenticacao, requisicao]);

  return (
    <div className="grid gap-5 p-4">
      <div className="flex items-center gap-4">
        <Label>Tipo</Label>
        <Select value={autenticacao.tipo} onValueChange={setTipo}>
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
        {autenticacao.tipo === 'none' && (
          <h1>Nenhuma autenticação selecionada</h1>
        )}
        {autenticacao.tipo === 'basic' && <BasicAuthentication />}
        {autenticacao.tipo === 'bearer' && <BearerAuthentication />}
      </div>
    </div>
  );
};
