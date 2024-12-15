import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useCallback, useRef } from 'react';
import useRequisicaoStore from '../store/requisicaoStore';

type Tipo = 'requisicao' | 'resposta';

interface EditorJsonProps {
  tipo: Tipo;
  readOnly?: boolean;
}

const EditorJson = ({ tipo, readOnly = false }: EditorJsonProps) => {
  const textAreaJsonRef = useRef<HTMLTextAreaElement>(null);
  const setJsonEnvio = useRequisicaoStore((state) => state.setJsonEnvio);
  const jsonEnvio = useRequisicaoStore((state) => state.requisicao.jsonEnvio);
  const jsonRetorno = useRequisicaoStore(
    (state) => state.requisicao.jsonRetorno
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const textArea = textAreaJsonRef.current;
      if (textArea) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        textArea.setRangeText('\t', start, end, 'select');
        textArea.setSelectionRange(start + 1, start + 1);
      }
    }
  };

  const handleChange = () => {
    const textArea = textAreaJsonRef.current;
    const caracteresAbertura = ['{', '"', '['];
    const caracteresFechamento = ['}', '"', ']'];
    if (textArea) {
      const textoAtual = textArea.value;
      const posicaoCursor = textArea.selectionStart;
      const letraDigitada = textoAtual.slice(posicaoCursor - 1, posicaoCursor);
      if (caracteresAbertura.includes(letraDigitada)) {
        const textoAntes = textoAtual.slice(0, posicaoCursor);
        const textoDepois = textoAtual.slice(posicaoCursor);
        const novaLetra =
          caracteresFechamento[caracteresAbertura.indexOf(letraDigitada)];

        textArea.value = textoAntes + novaLetra + textoDepois;
        textArea.selectionStart = posicaoCursor;
        textArea.selectionEnd = posicaoCursor;
      }
    }
  };

  const handleFormatar = () => {
    if (textAreaJsonRef.current) {
      try {
        const parsedValue = JSON.parse(textAreaJsonRef.current.value);
        textAreaJsonRef.current.value = JSON.stringify(parsedValue, null, 2);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (erro) {
        alert('Erro ao formatar o JSON: JSON inválido!');
      }
    }
  };

  const handleSetValue = useCallback(
    (json: string) => {
      if (json) {
        const parsedValue = JSON.parse(json);
        json = JSON.stringify(parsedValue, null, 2);
      }
      console.log(json);
      if (tipo === 'requisicao') {
        setJsonEnvio(json);
      }
    },
    [setJsonEnvio, tipo]
  );

  return (
    <div className="flex flex-col gap-1 p-4 w-full h-full">
      <div className="flex justify-between">
        <h1 className="flex items-center justify-center h-9">Conteúdo JSON</h1>
        {!readOnly && (
          <Button
            variant="link"
            className="text-zinc-300"
            onClick={handleFormatar}
          >
            Formatar
          </Button>
        )}
      </div>
      <Textarea
        className="resize-none flex-grow md:text-lg border-stone-600"
        ref={textAreaJsonRef}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        onBlur={(e) => handleSetValue(e.target.value)}
        defaultValue={tipo === 'requisicao' ? jsonEnvio : jsonRetorno}
        onChange={handleChange}
        id={tipo}
      />
    </div>
  );
};

export default EditorJson;
