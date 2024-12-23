import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';

export const Comunicacao = () => {
  return (
    <div className="h-screen grid grid-rows-[1fr_auto_1fr] gap-3">
      <Requisicao />
      <Separator orientation="horizontal" className="bg-stone-500" />
      <Resposta />
    </div>
  );
};
