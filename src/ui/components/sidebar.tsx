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
    <div className="flex flex-col bg-stone-700 w-1/6 p-3 border-r border-stone-500 h-screen">
      <div className="flex flex-col gap-9 xl:gap-3 flex-1">
        <Link to="/requisicao/cadastrar">
          <Button
            variant="default"
            size="lg"
            className="w-full text-xs lg:text-base tracking-wider"
          >
            <PlusCircleIcon />{' '}
            <p className="hidden md:block">Nova Requisição</p>
          </Button>
        </Link>
        <Tabs defaultValue="Atividade" className="flex flex-col gap-3">
          <TabsList className="flex flex-col xl:flex-row">
            <TabsTrigger value="Atividade">Atividade</TabsTrigger>
            <TabsTrigger value="Coleções">Coleções</TabsTrigger>
            <TabsTrigger value="Variáveis">Variáveis</TabsTrigger>
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
      <div>
        <SeletorTema />
      </div>
    </div>
  );
};

export default Sidebar;
