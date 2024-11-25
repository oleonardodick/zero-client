import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import RequisicoesColecao from './requisicoesColecao';
import { FolderClosedIcon, FolderOpenIcon } from 'lucide-react';

interface FolderProps {
  nome: string;
}
const Folder: React.FC<FolderProps> = ({ nome }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex gap-2 hover:bg-zinc-600 cursor-pointer p-2 w-full">
        <span className="hidden lg:block">
          {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}
        </span>
        {nome}
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4">
        <RequisicoesColecao />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Folder;
