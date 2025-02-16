import { useState } from 'react';
import { Autenticacao } from '../autenticacao';
import { EditorCode } from '../codeMirror/editorCode';
import Headers from '../headers';
import QueryParams from '../queryParams';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
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
            <TabsTrigger value="JSON">JSON</TabsTrigger>
            <TabsTrigger value="Auth">Auth</TabsTrigger>
            <TabsTrigger value="Params">Params</TabsTrigger>
            <TabsTrigger value="Headers">Headers</TabsTrigger>
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
  const { requisicao, setRequisicao } = useRequisicaoStore();
  const [erro, setErro] = useState('');

  const atualizaJsonEnvio = (json: string) => {
    setRequisicao({ jsonEnvio: json });
  };

  const handleChange = (newValue: string) => {
    atualizaJsonEnvio(newValue);
  };

  const handleFormatar = () => {
    if (requisicao.jsonEnvio) {
      try {
        const parsedValue = JSON.parse(requisicao.jsonEnvio);
        atualizaJsonEnvio(JSON.stringify(parsedValue, null, 2));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (erro) {
        setErro('Erro ao formatar o JSON: JSON inválido!');
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 px-2 w-full h-full relative">
      <div className="flex justify-between absolute right-5 top-2 z-10">
        <span className="text-red-500">{erro}</span>
        <div className="flex">
          <Button variant="link" onClick={handleFormatar}>
            Formatar
          </Button>
        </div>
      </div>
      <EditorCode jsonText={requisicao.jsonEnvio} onChange={handleChange} />
    </div>
  );
};

export default Requisicao;
