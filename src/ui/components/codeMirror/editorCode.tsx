import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import './codemirror.css';
import { useTheme } from '@/ui/contexts/theme-context';

interface EditorCodeProps {
  jsonText: string;
  onChange?: (json: string) => void;
  editable?: boolean;
}

export const EditorCode = ({
  jsonText,
  onChange,
  editable = true,
}: EditorCodeProps) => {
  const { theme } = useTheme();

  return (
    <CodeMirror
      value={jsonText}
      extensions={[json()]}
      onChange={onChange}
      className="flex-grow"
      height="100%"
      theme={theme}
      editable={editable}
      maxHeight="400px"
    />
  );
};
