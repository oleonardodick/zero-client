import Requisicao from './requisicao';

const RequisicoesColecao: React.FC = () => {
  return (
    <Requisicao
      metodo="GET"
      nome="Busca Usuarios"
      dataRequisicao="9 dias atrás"
    />
  );
};

export default RequisicoesColecao;
