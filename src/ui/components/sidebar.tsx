import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Atividade from './atividade';
import VariaveisAmbiente from './variaveisAmbiente';
import Colecoes from './colecoes';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-9 lg:gap-3 bg-stone-700 w-1/6 p-3 border-r border-stone-500 h-screen">
      <Link to="/requisicao">
        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-indigo-500 text-xs lg:text-base tracking-wider hover:bg-indigo-600"
        >
          <PlusCircleIcon /> <p className="hidden md:block">Nova Requisição</p>
        </Button>
      </Link>
      <Tabs defaultValue="Atividade" className="flex flex-col gap-3">
        <TabsList className="bg-transparent flex flex-col lg:flex-row">
          <TabSidebar value="Atividade" />
          <TabSidebar value="Coleções" />
          <TabSidebar value="Variáveis" />
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

interface TabSidebarProps {
  value: string;
}

const TabSidebar = ({ value }: TabSidebarProps) => {
  return (
    <TabsTrigger
      value={value}
      className="lg:flex-1 data-[state=active]:bg-transparent data-[state=active]:text-gray-100 
      data-[state=active]:shadow-none data-[state=active]:border-b-4 border-indigo-400 rounded-none"
    >
      {value}
    </TabsTrigger>
  );
};

export default Sidebar;
