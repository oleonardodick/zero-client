import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import useRequisicaoStore from '../store/requisicaoStore';
import useRespostaStore from '../store/respostaStore';
import { TipoRequisicao } from '../enums/tipoRequisicao.enum';
import { v4 as uuidv4 } from 'uuid';

export const Comunicacao = () => {
  const { id } = useParams();
  const fetchRequisicao = useRequisicaoStore((state) => state.fetchRequisicao);
  const inicializaResposta = useRespostaStore(
    (state) => state.inicializaResposta
  );
  const limpaResposta = useRespostaStore((state) => state.limpaReposta);
  const requisicaoBranca: RequisicaoDTO = useMemo(
    () => ({
      id: uuidv4(),
      url: '',
      tipo: TipoRequisicao.GET,
      jsonEnvio: '',
      nome: '',
    }),
    []
  );

  useEffect(() => {
    if (id) fetchRequisicao(id);
  }, [id, fetchRequisicao]);

  // useEffect(() => {
  //   limpaResposta();
  //   if (!id) {
  //     inicializaRequisicao(requisicaoBranca);
  //     return;
  //   }

  //   const buscaRequisicao = async () => {
  //     if (id) {
  //       const requisicaoBuscada = await window.electron.buscaRequisicaoPorId(
  //         id
  //       );
  //       inicializaRequisicao(requisicaoBuscada || requisicaoBranca);
  //       if (requisicaoBuscada?.resposta)
  //         inicializaResposta(requisicaoBuscada?.resposta);
  //     }
  //   };
  //   buscaRequisicao();
  // }, [
  //   id,
  //   inicializaRequisicao,
  //   inicializaResposta,
  //   limpaResposta,
  //   requisicaoBranca,
  // ]);
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
