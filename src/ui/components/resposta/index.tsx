import useRespostaStore from '@/ui/store/respostaStore';
import EditorJson from '../editorJson';
import TabOpcoes from '../tabOpcoes';
import { Tabs, TabsContent, TabsList } from '../ui/tabs';
import CabecalhoResposta from './cabecalho';

const Resposta = () => {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <header>
        <CabecalhoResposta />
      </header>
      <main>
        <Tabs defaultValue="Source" className="flex flex-col gap-3 px-1 h-full">
          <TabsList className="bg-transparent flex flex-col lg:flex-row">
            <TabOpcoes value="Source" />
            <TabOpcoes value="Cookies" />
            <TabOpcoes value="Headers" />
          </TabsList>
          <TabsContent value="Source" className="flex h-full">
            <JsonResposta />
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

const JsonResposta = () => {
  const jsonRetorno = useRespostaStore((state) => state.resposta.jsonRetorno);
  return <EditorJson json={jsonRetorno} readOnly />;
};

export default Resposta;
