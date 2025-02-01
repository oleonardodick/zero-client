import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import Endpoint from '../endpoint';

const EndpointsColecao = () => {
  const requisicao: RequisicaoDTO = {
    nome: 'teste',
    jsonEnvio: 'teste',
    tipo: 'get',
    url: 'teste',
  };
  return <Endpoint requisicao={requisicao} />;
};

export default EndpointsColecao;
