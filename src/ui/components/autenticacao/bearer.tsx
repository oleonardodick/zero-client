import useRequisicaoStore from '@/ui/store/requisicaoStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCallback, useRef } from 'react';
import { AutenticacaoDTO, Bearer } from '@/dtos/autenticacao.dto';

export const BearerAuthentication = () => {
  const inputTokenRef = useRef<HTMLTextAreaElement | null>(null);
  const inputTokenPrefixRef = useRef<HTMLInputElement | null>(null);

  const autenticacao = useRequisicaoStore((state) => state.autenticacao);

  const bearer = useRequisicaoStore((state) => state.autenticacao.bearer);

  const setAutenticacao = useRequisicaoStore((state) => state.setAutenticacao);

  const handleUpdateValues = useCallback(() => {
    const bearer = new Bearer(
      inputTokenPrefixRef.current?.value || '',
      inputTokenRef.current?.value || ''
    );
    const autenticacaoDto = new AutenticacaoDTO(
      'bearer',
      bearer,
      autenticacao.basic || undefined
    );
    setAutenticacao(autenticacaoDto);
  }, [setAutenticacao, autenticacao]);

  return (
    <div className="grid gap-3">
      <h1>Bearer Token</h1>
      <Textarea
        rows={5}
        className="resize-none"
        defaultValue={bearer?.token}
        id="bearerToken"
        ref={inputTokenRef}
        onBlur={handleUpdateValues}
      />
      <div className="flex gap-2 items-center mt-2">
        <Label htmlFor="tokenPrefix">Token Prefix</Label>
        <Input
          id="tokenPrefix"
          defaultValue={bearer?.prefix || 'bearer'}
          className="flex-1"
          ref={inputTokenPrefixRef}
          onBlur={handleUpdateValues}
        />
      </div>
    </div>
  );
};
