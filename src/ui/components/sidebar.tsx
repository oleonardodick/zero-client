import TabAtividade from './tabAtividade';
import TabColecoes from './tabColecoes';
import TabEnv from './tabEnv';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-zinc-700 w-1/6 p-3 border-r border-zinc-300">
      <Button
        variant="secondary"
        size="lg"
        className="w-full bg-purple-500 text-md tracking-wider hover:bg-purple-600"
      >
        Nova Requisição
      </Button>
      <Tabs
        defaultValue="Atividade"
        className="mt-5 h-full flex flex-col gap-3"
      >
        <TabsList className="bg-transparent w-full">
          <TabsTrigger value="Atividade">Atividade</TabsTrigger>
          <TabsTrigger value="Colecoes">Coleções</TabsTrigger>
          <TabsTrigger value="Env">Env</TabsTrigger>
        </TabsList>
        <TabsContent value="Atividade">
          <TabAtividade />
        </TabsContent>
        <TabsContent value="Colecoes">
          <TabColecoes />
        </TabsContent>
        <TabsContent value="Env">
          <TabEnv />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
