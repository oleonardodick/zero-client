import useRespostaStore from '@/ui/store/respostaStore';

const CabecalhoResposta = () => {
  const resposta = useRespostaStore((state) => state.resposta);
  return (
    <div className="flex justify-between px-2 items-center">
      <span>Resposta</span>
      <div className="flex gap-3">
        {resposta.status > 0 && (
          <span
            className={`${
              resposta.status.toString().startsWith('2')
                ? 'bg-green-700'
                : 'bg-red-700'
            } rounded-xl p-2`}
          >
            {resposta.status} {resposta.statusText}
          </span>
        )}
        {resposta.time > 0 && (
          <span className="bg-gray-500 rounded-xl p-2">
            Time {resposta.time} ms
          </span>
        )}

        {resposta.size > 0 && (
          <span className="bg-gray-500 rounded-xl p-2">
            Size {resposta.size} Bytes
          </span>
        )}
      </div>
    </div>
  );
};

export default CabecalhoResposta;
