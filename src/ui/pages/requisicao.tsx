import EditorJson from '../components/editorJson';
import { Separator } from '../components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Autenticacao } from '../components/autenticacao';
import QueryParams from '../components/queryParams';
import Headers from '../components/headers';
import CabecalhoRequisicao from '../components/cabecalhoRequisicao';
import CabecalhoResposta from '../components/cabecalhoResposta';

export const PaginaRequisicao = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="grid grid-cols-[1fr_auto_1fr] gap-2 bg-stone-700">
        <CabecalhoRequisicao />
        <Separator orientation="vertical" className="bg-stone-500" />
        <CabecalhoResposta />
      </header>

      <main className="grid grid-cols-[1fr_auto_1fr] flex-grow gap-2">
        <Tabs defaultValue="JSON" className="flex flex-col gap-3 px-1 h-full">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="JSON" />
            <TabOpcoes value="Auth" />
            <TabOpcoes value="Params" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="JSON" className="h-full">
            <EditorJson tipo="requisicao" />
          </TabsContent>
          <TabsContent value="Auth">
            <Autenticacao />
          </TabsContent>
          <TabsContent value="Params">
            <QueryParams />
          </TabsContent>
          <TabsContent value="Headers">
            <Headers />
          </TabsContent>
        </Tabs>

        <Separator orientation="vertical" className="bg-stone-500" />

        <Tabs defaultValue="Source" className="flex flex-col gap-3 px-1">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="Source" />
            <TabOpcoes value="Cookies" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="Source" className="flex h-full">
            <EditorJson readOnly tipo="resposta" />
          </TabsContent>
          <TabsContent value="Cookies">
            <main>Cookies</main>
          </TabsContent>
          <TabsContent value="Headers">
            <main>Headers</main>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface TabOpcoesProps {
  value: string;
}
const TabOpcoes = ({ value }: TabOpcoesProps) => {
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
