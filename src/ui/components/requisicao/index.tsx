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
    <div className="h-full xl:h-1/2 flex flex-col w-full pb-1">
      <div className="h-16">
        <CabecalhoRequisicao />
      </div>
      <Tabs defaultValue="JSON" className="flex flex-col h-[calc(100%-4rem)]">
        <TabsList className="bg-transparent flex flex-row">
          <TabsTrigger value="JSON">JSON</TabsTrigger>
          <TabsTrigger value="Auth">Auth</TabsTrigger>
          <TabsTrigger value="Params">Params</TabsTrigger>
          <TabsTrigger value="Headers">Headers</TabsTrigger>
        </TabsList>
        <TabsContent value="JSON" className="h-[calc(100%-2.25rem)]">
          <JsonEnvio />
        </TabsContent>
        <TabsContent value="Auth" className="h-[calc(100%-2.25rem)]">
          <Autenticacao />
        </TabsContent>
        <TabsContent value="Params" className="h-[calc(100%-2.25rem)]">
          <QueryParams />
        </TabsContent>
        <TabsContent value="Headers" className="h-[calc(100%-2.25rem)]">
          <Headers />
        </TabsContent>
      </Tabs>
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
    <div className="h-full relative">
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
