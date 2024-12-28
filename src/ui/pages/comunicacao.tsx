import { Separator } from '../components/ui/separator';
import Requisicao from '../components/requisicao';
import Resposta from '../components/resposta';

export const Comunicacao = () => {
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
