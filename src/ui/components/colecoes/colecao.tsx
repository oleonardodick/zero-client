import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import Pasta from './pasta';

interface ColeacaoProps {
  nome: string;
}

const Colecao = ({ nome }: ColeacaoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex gap-2 text-gray-400 data-[state=open]:text-gray-100 hover:bg-gray-600 cursor-pointer p-2 w-full">
        <span className="hidden lg:block">
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </span>
        {nome}
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4">
        <Pasta nome="Usuarios" />
        <Pasta nome="Materiais" />
        <Pasta nome="Empresas" />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Colecao;
