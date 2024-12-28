import { Autenticacao } from '../autenticacao';
import EditorJson from '../editorJson';
import Headers from '../headers';
import QueryParams from '../queryParams';
import TabOpcoes from '../tabOpcoes';
import { Tabs, TabsList, TabsContent } from '../ui/tabs';
import CabecalhoRequisicao from './cabecalho';
import useRequisicaoStore from '@/ui/store/requisicaoStore';

const Requisicao = () => {
  return (
    <div className="flex flex-col h-full">
      <header>
        <CabecalhoRequisicao />
      </header>
      <main className="flex-1 overflow-hidden">
        <Tabs defaultValue="JSON" className="flex flex-col gap-3 h-full">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="JSON" />
            <TabOpcoes value="Auth" />
            <TabOpcoes value="Params" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="JSON" className="h-full">
            <JsonEnvio />
          </TabsContent>
          <TabsContent value="Auth">
            <Autenticacao />
          </TabsContent>
          <TabsContent value="Params" className="overflow-hidden">
            <QueryParams />
          </TabsContent>
          <TabsContent value="Headers" className="overflow-hidden">
            <Headers />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const JsonEnvio = () => {
  const setJsonEnvio = useRequisicaoStore((state) => state.setJsonEnvio);
  const jsonEnvio = useRequisicaoStore((state) => state.requisicao.jsonEnvio);
  return <EditorJson setJson={setJsonEnvio} json={jsonEnvio} />;
};

export default Requisicao;
