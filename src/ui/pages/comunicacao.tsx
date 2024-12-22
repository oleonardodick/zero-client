import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';

export const Comunicacao = () => {
  return (
    <div className="h-screen grid grid-cols-[1fr_auto_1fr]">
      <Requisicao />
      <Separator orientation="vertical" className="bg-stone-500" />
      <Resposta />
    </div>
  );
};
