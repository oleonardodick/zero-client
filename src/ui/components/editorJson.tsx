import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useRef, useState } from 'react';

interface EditorJsonProps {
  readOnly?: boolean;
  json?: string;
  setJson?: (json: string) => void;
}

const EditorJson = ({ readOnly = false, setJson, json }: EditorJsonProps) => {
  const textAreaJsonRef = useRef<HTMLTextAreaElement>(null);
  const [textoCopiado, setTextoCopiado] = useState<boolean>(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const caracteresAbertura = ['{', '"', '['];
    if (!caracteresAbertura.includes(event.key) && event.key !== 'Tab') return;

    event.preventDefault();
    const textArea = textAreaJsonRef.current;
    if (textArea) {
      if (event.key === 'Tab') {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        textArea.setRangeText('\t', start, end, 'select');
        textArea.setSelectionRange(start + 1, start + 1);
      } else {
        const caracteresFechamento = ['}', '"', ']'];
        const textoAtual = textArea.value;
        const novaLetra =
          caracteresFechamento[caracteresAbertura.indexOf(event.key)];
        const posicaoCursor = textArea.selectionStart;
        const novoTexto =
          textoAtual.slice(0, posicaoCursor) +
          event.key +
          novaLetra +
          textoAtual.slice(posicaoCursor);
        textArea.value = novoTexto;
        textArea.selectionStart = posicaoCursor + 1;
        textArea.selectionEnd = posicaoCursor + 1;
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

  const handleCopiar = () => {
    navigator.clipboard.writeText(json || '');
    setTextoCopiado(true);
    setTimeout(() => {
      setTextoCopiado(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-1 px-2 w-full h-full">
      {!readOnly && (
        <div className="flex justify-end">
          <Button
            variant="link"
            className="text-zinc-300 w-fit"
            onClick={handleFormatar}
          >
            Formatar
          </Button>
        </div>
      )}
      <div className="relative flex right-4 justify-end">
        <Button
          variant="link"
          className="text-zinc-300 w-fit absolute top-3"
          onClick={textoCopiado ? undefined : handleCopiar}
          id="btnCopiar"
        >
          {textoCopiado ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
      <Textarea
        className="resize-none flex-grow"
        ref={textAreaJsonRef}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        onBlur={(e) => setJson?.(e.target.value)}
        defaultValue={json}
      />
    </div>
  );
};

export default EditorJson;
