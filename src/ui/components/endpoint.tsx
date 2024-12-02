interface RequestProps {
  metodo: string;
  nome?: string;
  url?: string;
  dataRequisicao: string;
}

const Endpoint = ({ metodo, nome, url, dataRequisicao }: RequestProps) => {
  return (
    <div className="hover:bg-gray-600 cursor-pointer p-2 rounded-md">
      <div className="flex flex-col lg:flex-row gap-2 mb-2">
        <span
          data-method={metodo}
          className="rounded-lg px-2 font-bold 
            data-[method=GET]:bg-blue-500 
            data-[method=POST]:bg-green-500 
            data-[method=PUT]:bg-cyan-500 
            data-[method=DELETE]:bg-red-500"
        >
          {metodo}
        </span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {nome}
          {url}
        </span>
      </div>
      <p>{dataRequisicao}</p>
    </div>
  );
};

export default Endpoint;
