import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useRef } from 'react';
import { Bearer } from '@/dtos/autenticacao.dto';
import { useAutenticacaoStore } from '@/ui/store/autenticacaoStore';

export const BearerAuthentication = () => {
  const inputTokenRef = useRef<HTMLTextAreaElement | null>(null);
  const inputTokenPrefixRef = useRef<HTMLInputElement | null>(null);
  const autenticacao = useAutenticacaoStore((state) => state.autenticacao);
  const setBearer = useAutenticacaoStore((state) => state.setBearer);

  const handleUpdateValues = () => {
    const bearer: Bearer = {
      prefix: inputTokenPrefixRef.current?.value || '',
      token: inputTokenRef.current?.value || '',
      autenticacao_id: autenticacao.id,
    };
    setBearer(bearer);
  };

  return (
    <div className="grid gap-3">
      <h1>Bearer Token</h1>
      <Textarea
        rows={5}
        className="resize-none"
        defaultValue={autenticacao.bearer?.token}
        id="bearerToken"
        ref={inputTokenRef}
        onBlur={handleUpdateValues}
      />
      <div className="flex gap-2 items-center mt-2">
        <Label htmlFor="tokenPrefix">Token Prefix</Label>
        <Input
          id="tokenPrefix"
          defaultValue={autenticacao.bearer?.prefix || 'bearer'}
          className="flex-1"
          ref={inputTokenPrefixRef}
          onBlur={handleUpdateValues}
        />
      </div>
    </div>
  );
};
