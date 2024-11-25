import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TabAtividade from './tabAtividade';
import TabColecoes from './tabColecoes';
import TabEnv from './tabEnv';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col gap-9 lg:gap-3 bg-zinc-700 w-1/6 p-3 border-r border-zinc-300 h-screen">
      <Button
        variant="secondary"
        size="lg"
        className="w-full bg-purple-500 text-xs lg:text-base tracking-wider hover:bg-purple-600"
      >
        Nova Requisição
      </Button>
      <Tabs defaultValue="Atividade" className="flex flex-col gap-3">
        <TabsList className="bg-transparent flex flex-col lg:flex-row">
          <TabSidebar value="Atividade" />
          <TabSidebar value="Coleções" />
          <TabSidebar value="Variáveis" />
        </TabsList>
        <TabsContent value="Atividade">
          <TabAtividade />
        </TabsContent>
        <TabsContent value="Coleções">
          <TabColecoes />
        </TabsContent>
        <TabsContent value="Variáveis">
          <TabEnv />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface tabSidebarProps {
  value: string;
}

const TabSidebar: React.FC<tabSidebarProps> = ({ value }) => {
  return (
    <TabsTrigger value={value} className="lg:flex-1">
      {value}
    </TabsTrigger>
  );
};

export default Sidebar;
