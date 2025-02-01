import { useCallback, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useRequisicaoStore from '@/ui/store/requisicaoStore';
import { AutenticacaoDTO, Basic } from '@/dtos/autenticacao.dto';

export const BasicAuthentication = () => {
  const inputUsuarioRef = useRef<HTMLInputElement | null>(null);
  const inputSenhaRef = useRef<HTMLInputElement | null>(null);

  const basic = useRequisicaoStore((state) => state.autenticacao.basic);

  const setAutenticacao = useRequisicaoStore((state) => state.setAutenticacao);

  const handleUpdateValues = useCallback(() => {
    const basic: Basic = {
      usuario: inputUsuarioRef.current?.value || '',
      senha: inputSenhaRef.current?.value || '',
    };

    const autenticacaoDTO: AutenticacaoDTO = {
      tipo: 'basic',
      basic: basic,
    };

    setAutenticacao(autenticacaoDTO);
  }, [setAutenticacao]);
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
            defaultValue={basic?.usuario}
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
            defaultValue={basic?.senha}
          />
        </div>
      </div>
    </div>
  );
};
