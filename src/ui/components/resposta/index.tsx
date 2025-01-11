import useRespostaStore from '@/ui/store/respostaStore';
import EditorJson from '../editorJson';
import CabecalhoResposta from './cabecalho';

const Resposta = () => {
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
  return <EditorJson json={jsonRetorno} readOnly />;
};

export default Resposta;
