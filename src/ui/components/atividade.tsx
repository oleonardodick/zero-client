import Endpoint from './endpoint';

const Atividade = () => {
  return (
    <div>
      <ul>
        <li>
          <Endpoint
            metodo="GET"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="POST"
            url="http://localhost:3000/users"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="PUT"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
        <li>
          <Endpoint
            metodo="DELETE"
            url="http://localhost:3000/users/1"
            dataRequisicao="9 dias atrás"
          />
        </li>
      </ul>
    </div>
  );
};

export default Atividade;
