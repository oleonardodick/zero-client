import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import useRequisicaoStore from '../store/requisicaoStore';

export const Comunicacao = () => {
  const { id } = useParams();
  const inicializaRequisicao = useRequisicaoStore(
    (state) => state.inicializaRequisicao
  );

  useEffect(() => {
    if (!id) {
      inicializaRequisicao(new RequisicaoDTO('', 'get', ''));
      return;
    }
    const buscaRequisicao = async () => {
      if (id) {
        const requisicaoBuscada = await window.electron.buscaRequisicaoPorId(
          id
        );
        inicializaRequisicao(
          requisicaoBuscada || new RequisicaoDTO('', 'get', '')
        );
      }
    };
    buscaRequisicao();
  }, [id, inicializaRequisicao]);
  return (
    <div className="h-screen flex xl:flex-col gap-3">
      <div className="flex-1 overflow-hidden">
        <Requisicao />
      </div>
      <Separator
        orientation="horizontal"
        className="hidden xl:block bg-stone-500"
      />
      <Separator
        orientation="vertical"
        className="block xl:hidden bg-stone-500"
      />
      <div className="flex-1">
        <Resposta />
      </div>
    </div>
  );
};
