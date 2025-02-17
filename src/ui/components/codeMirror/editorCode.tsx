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
      className="px-2 h-full"
      theme={theme}
      editable={editable}
    />
  );
};
