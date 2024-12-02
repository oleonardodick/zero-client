import { useState } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Bearer } from './bearer';
import { Basic } from './basic';

export const Autenticacao = () => {
  const [autenticacao, setAutenticacao] = useState('none');

  return (
    <div className="grid gap-5 p-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="auth">Tipo</Label>
        <Select defaultValue={autenticacao} onValueChange={setAutenticacao}>
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
        {autenticacao === 'none' && <h1>Nenhuma autenticação selecionada</h1>}
        {autenticacao === 'basic' && <Basic />}
        {autenticacao === 'bearer' && <Bearer />}
      </div>
    </div>
  );
};
