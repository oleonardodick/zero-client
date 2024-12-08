import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface EditorJsonProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  readOnly?: boolean;
}

const EditorJson = ({ textAreaRef, readOnly = false }: EditorJsonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const textArea = textAreaRef.current;
      if (textArea) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        textArea.setRangeText('\t', start, end, 'select');
        textArea.setSelectionRange(start + 1, start + 1);
      }
    }
  };

  const handleFormatar = () => {
    if (textAreaRef.current) {
      try {
        const parsedValue = JSON.parse(textAreaRef.current.value);
        textAreaRef.current.value = JSON.stringify(parsedValue, null, 2);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (erro) {
        alert('Erro ao formatar o JSON: JSON inválido!');
      }
    }
  };

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
        ref={textAreaRef}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
      />
    </div>
  );
};

export default EditorJson;
