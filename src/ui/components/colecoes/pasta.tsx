import { useState } from 'react';
import { FolderClosedIcon, FolderOpenIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import EndpointsColecao from './endpointsColecao';

interface PastaProps {
  nome: string;
}
const Pasta = ({ nome }: PastaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex gap-2 text-gray-400 data-[state=open]:text-gray-100 hover:bg-gray-600 cursor-pointer p-2 w-full">
        <span className="hidden lg:block">
          {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}
        </span>
        {nome}
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4">
        <EndpointsColecao />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Pasta;
