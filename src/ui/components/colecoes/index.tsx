import Colecao from './colecao';

const Colecoes: React.FC = () => {
  return (
    <div>
      <ul>
        <Colecao nome="SalesApp" />
        <Colecao nome="OutraColecao" />
      </ul>
    </div>
  );
};

export default Colecoes;
