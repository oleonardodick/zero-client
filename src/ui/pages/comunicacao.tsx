import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useRequisicaoStore from '../store/requisicaoStore';

export const Comunicacao = () => {
  const { id } = useParams();
  const { fetchRequisicao, novaRequisicao } = useRequisicaoStore();

  useEffect(() => {
    if (id) {
      fetchRequisicao(id);
    } else {
      novaRequisicao();
    }
  }, [id, fetchRequisicao, novaRequisicao]);

  return (
    <div className="h-screen flex xl:flex-col gap-3">
      <div className="flex-1 overflow-hidden">
        <Requisicao />
      </div>
      <Separator orientation="horizontal" className="hidden xl:block" />
      <Separator orientation="vertical" className="block xl:hidden" />
      <div className="flex-1">
        <Resposta />
      </div>
    </div>
  );
};
