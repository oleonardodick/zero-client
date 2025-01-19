import { useCallback, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useRequisicaoStore from '@/ui/store/requisicaoStore';
import { AutenticacaoDTO, Basic } from '@/dtos/autenticacao.dto';

export const BasicAuthentication = () => {
  const inputUsuarioRef = useRef<HTMLInputElement | null>(null);
  const inputSenhaRef = useRef<HTMLInputElement | null>(null);

  const autenticacao = useRequisicaoStore((state) => state.autenticacao);

  const basic = useRequisicaoStore((state) => state.autenticacao.basic);

  const setAutenticacao = useRequisicaoStore((state) => state.setAutenticacao);

  const handleUpdateValues = useCallback(() => {
    const basic = new Basic(
      inputUsuarioRef.current?.value || '',
      inputSenhaRef.current?.value || ''
    );
    const autenticacaoDto = new AutenticacaoDTO(
      'basic',
      autenticacao.bearer || undefined,
      basic
    );
    setAutenticacao(autenticacaoDto);
  }, [setAutenticacao, autenticacao]);
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
