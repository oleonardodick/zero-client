import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Atividade from './atividade';
import VariaveisAmbiente from './variaveisAmbiente';
import Colecoes from './colecoes';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from 'lucide-react';
import { SeletorTema } from './seletorTema';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-1/6 p-3 border-r h-screen bg-stone-300 border-bg-stone-300 dark:bg-stone-700 dark:border-stone-500 ">
      <div className="flex flex-col gap-9 xl:gap-3 h-[95%]">
        <Link to="/requisicao/cadastrar">
          <Button
            variant="default"
            size="lg"
            className="w-full text-xs lg:text-base tracking-wider h-10"
          >
            <PlusCircleIcon />
            <p className="hidden md:block">Nova Requisição</p>
          </Button>
        </Link>
        <Tabs
          defaultValue="Atividade"
          className="flex flex-col gap-3 h-[calc(100%-4rem)]"
        >
          <TabsList className="flex flex-col xl:flex-row">
            <TabsTrigger value="Atividade">Atividade</TabsTrigger>
            <TabsTrigger value="Coleções">Coleções</TabsTrigger>
            <TabsTrigger value="Variáveis">Variáveis</TabsTrigger>
          </TabsList>
          <TabsContent value="Atividade" className="h-[calc(100%-5.5rem)]">
            <Atividade />
          </TabsContent>
          <TabsContent value="Coleções" className="h-[calc(100%-5.5rem)]">
            <Colecoes />
          </TabsContent>
          <TabsContent value="Variáveis" className="h-[calc(100%-5.5rem)]">
            <VariaveisAmbiente />
          </TabsContent>
        </Tabs>
      </div>
      <div className="h-[5%]">
        <SeletorTema />
      </div>
    </div>
  );
};

export default Sidebar;
