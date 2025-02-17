import useRespostaStore from '@/ui/store/respostaStore';
import CabecalhoResposta from './cabecalho';
import { EditorCode } from '../codeMirror/editorCode';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import useRequisicaoStore from '@/ui/store/requisicaoStore';

const Resposta = () => {
  const { fetchResposta } = useRespostaStore();
  const { requisicao } = useRequisicaoStore();

  useEffect(() => {
    fetchResposta(requisicao.id);
  }, [fetchResposta, requisicao.id]);

  return (
    <div className="h-full xl:h-1/2 flex flex-col w-full pb-1">
      <div className="h-16">
        <CabecalhoResposta />
      </div>
      <JsonResposta />
    </div>
  );
};

const JsonResposta = () => {
  const { resposta } = useRespostaStore();
  const [textoCopiado, setTextoCopiado] = useState(false);

  const handleCopiar = () => {
    navigator.clipboard.writeText(resposta.json_retorno || '');
    setTextoCopiado(true);
    setTimeout(() => {
      setTextoCopiado(false);
    }, 1500);
  };

  return (
    <div className="flex-1 relative mt-11 xl:mt-0">
      <div className="flex justify-between absolute right-5 top-2 z-10">
        <div className="flex">
          <Button variant="link" onClick={handleCopiar}>
            {textoCopiado ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </div>
      <EditorCode jsonText={resposta.json_retorno} editable={false} />
    </div>
  );
};

export default Resposta;
