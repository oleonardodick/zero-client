import Colecao from './colecao';

const TabColecoes: React.FC = () => {
  return (
    <div>
      <ul>
        <Colecao nome="SalesApp" />
        <Colecao nome="OutraColecao" />
      </ul>
    </div>
  );
};

export default TabColecoes;
