import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import Endpoint from '../endpoint';

const EndpointsColecao = () => {
  const requisicao = new RequisicaoDTO('teste', 'get', 'teste');
  return <Endpoint requisicao={requisicao} />;
};

export default EndpointsColecao;
