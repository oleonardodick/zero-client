import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EndpointProps {
  requisicao: RequisicaoDTO;
}

const Endpoint = ({ requisicao }: EndpointProps) => {
  return (
    <div className="hover:bg-gray-600 cursor-pointer p-2 rounded-md">
      <Link to={`/requisicao/modificar/${requisicao.id}`}>
        <div className="flex flex-col lg:flex-row gap-2 mb-2">
          <span
            data-method={requisicao.tipo.toUpperCase()}
            className="rounded-lg px-2 font-bold 
            data-[method=GET]:bg-blue-500 
            data-[method=POST]:bg-green-500 
            data-[method=PUT]:bg-cyan-500 
            data-[method=DELETE]:bg-red-500"
          >
            {requisicao.tipo.toUpperCase()}
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {requisicao.nome ? requisicao.nome : requisicao.url}
          </span>
        </div>
        {requisicao.data && (
          <p>
            {formatDistanceToNowStrict(requisicao.data, {
              locale: ptBR,
              addSuffix: true,
            })}
          </p>
        )}
      </Link>
    </div>
  );
};

export default Endpoint;
