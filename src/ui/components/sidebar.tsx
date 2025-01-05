import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList } from './ui/tabs';
import Atividade from './atividade';
import VariaveisAmbiente from './variaveisAmbiente';
import Colecoes from './colecoes';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from 'lucide-react';
import TabOpcoes from './tabOpcoes';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-9 xl:gap-3 bg-stone-700 w-1/6 p-3 border-r border-stone-500 h-screen">
      <Link to="/requisicao/cadastrar">
        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-indigo-500 text-xs lg:text-base tracking-wider hover:bg-indigo-600"
        >
          <PlusCircleIcon /> <p className="hidden md:block">Nova Requisição</p>
        </Button>
      </Link>
      <Tabs defaultValue="Atividade" className="flex flex-col gap-3">
        <TabsList className="bg-transparent flex flex-col xl:flex-row">
          <TabOpcoes value="Atividade" />
          <TabOpcoes value="Coleções" />
          <TabOpcoes value="Variáveis" />
        </TabsList>
        <TabsContent value="Atividade">
          <Atividade />
        </TabsContent>
        <TabsContent value="Coleções">
          <Colecoes />
        </TabsContent>
        <TabsContent value="Variáveis">
          <VariaveisAmbiente />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
