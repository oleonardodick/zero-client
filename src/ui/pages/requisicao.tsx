import { useRef } from 'react';
import EditorJson from '../components/editorJson';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Autenticacao } from '../components/autenticacao';

export const Requisicao: React.FC = () => {
  const jsonEnvio = useRef<HTMLTextAreaElement>(null);
  const jsonResposta = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="h-screen flex flex-col">
      <header className="grid grid-cols-[1fr_auto_1fr] gap-2 bg-zinc-600">
        <div className="flex gap-1 py-4 px-2">
          <Select defaultValue="get">
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="get">GET</SelectItem>
                <SelectItem value="post">POST</SelectItem>
                <SelectItem value="put">PUT</SelectItem>
                <SelectItem value="patch">PATCH</SelectItem>
                <SelectItem value="delete">DELETE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="URL" />
          <Button variant="secondary">Enviar</Button>
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-3 justify-end py-4 px-2">
          <span className="bg-green-700 rounded-xl p-2">200 OK</span>
          <span className="bg-zinc-500 rounded-xl p-2">TIME 538 ms</span>
          <span className="bg-zinc-500 rounded-xl p-2">SIZE 358 B</span>
        </div>
      </header>
      <main className="grid grid-cols-[1fr_auto_1fr] flex-grow">
        <Tabs defaultValue="JSON" className="flex flex-col gap-3 px-1 h-full">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="JSON" />
            <TabOpcoes value="Auth" />
            <TabOpcoes value="Params" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="JSON" className=" h-full">
            <EditorJson textAreaRef={jsonEnvio} />
          </TabsContent>
          <TabsContent value="Auth">
            <Autenticacao />
          </TabsContent>
          <TabsContent value="Params" className="border border-white">
            <main>Params</main>
          </TabsContent>
          <TabsContent value="Headers" className="border border-white">
            <main>Headers</main>
          </TabsContent>
        </Tabs>

        <Separator orientation="vertical" />

        <Tabs defaultValue="Source" className="flex flex-col gap-3 px-1">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="Source" />
            <TabOpcoes value="Cookies" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="Source" className="flex h-full">
            <EditorJson readOnly textAreaRef={jsonResposta} />
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
const TabOpcoes: React.FC<TabOpcoesProps> = ({ value }) => {
  return (
    <TabsTrigger value={value} className="lg:flex-1">
      {value}
    </TabsTrigger>
  );
};
