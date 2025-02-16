import { useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Basic } from '@/dtos/autenticacao.dto';
import { useAutenticacaoStore } from '@/ui/store/autenticacaoStore';

export const BasicAuthentication = () => {
  const inputUsuarioRef = useRef<HTMLInputElement | null>(null);
  const inputSenhaRef = useRef<HTMLInputElement | null>(null);

  const { autenticacao, setAutenticacao } = useAutenticacaoStore();

  // const setBasic = useAutenticacaoStore((state) => state.setBasic);

  const handleUpdateValues = () => {
    const basic: Basic = {
      usuario: inputUsuarioRef.current?.value || '',
      senha: inputSenhaRef.current?.value || '',
      autenticacao_id: autenticacao.id,
    };

    setAutenticacao({ basic: basic });
  };
  return (
    <div className="grid gap-3">
      <h1>Basic Authentication</h1>
      <div className="grid gap-4">
        <div className="flex gap-2 items-center">
          <Label htmlFor="username" className="w-12">
            Usuário
          </Label>
          <Input
            id="username"
            ref={inputUsuarioRef}
            onBlur={handleUpdateValues}
            defaultValue={autenticacao.basic?.usuario}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label htmlFor="password" className="w-12">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            ref={inputSenhaRef}
            onBlur={handleUpdateValues}
            defaultValue={autenticacao.basic?.senha}
          />
        </div>
      </div>
    </div>
  );
};
