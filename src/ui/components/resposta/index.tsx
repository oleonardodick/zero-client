import useRespostaStore from '@/ui/store/respostaStore';
import CabecalhoResposta from './cabecalho';
import { EditorCode } from '../codeMirror/editorCode';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import useRequisicaoStore from '@/ui/store/requisicaoStore';

const Resposta = () => {
  const fetchResposta = useRespostaStore((state) => state.fetchResposta);
  const requisicao = useRequisicaoStore((state) => state.requisicao);

  useEffect(() => {
    fetchResposta(requisicao.id);
  }, [fetchResposta, requisicao]);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 h-full">
      <header>
        <CabecalhoResposta />
      </header>
      <main>
        <JsonResposta />
      </main>
    </div>
  );
};

const JsonResposta = () => {
  const jsonRetorno = useRespostaStore((state) => state.resposta.json_retorno);
  const [textoCopiado, setTextoCopiado] = useState(false);

  const handleCopiar = () => {
    navigator.clipboard.writeText(jsonRetorno || '');
    setTextoCopiado(true);
    setTimeout(() => {
      setTextoCopiado(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-1 px-2 w-full h-full relative">
      <div className="flex justify-between absolute right-5 top-2 z-10">
        <div className="flex">
          <Button variant="link" onClick={handleCopiar}>
            {textoCopiado ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </div>
      <EditorCode jsonText={jsonRetorno} editable={false} />
    </div>
  );
};

export default Resposta;
