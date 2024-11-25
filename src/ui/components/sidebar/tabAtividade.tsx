import Requisicao from './requisicao';

const TabAtividade: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Requisicao
            metodo="GET"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Requisicao
            metodo="POST"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Requisicao
            metodo="PUT"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Requisicao
            metodo="DELETE"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
      </ul>
    </div>
  );
};

export default TabAtividade;
