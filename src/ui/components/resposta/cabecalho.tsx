import useRespostaStore from '@/ui/store/respostaStore';

const CabecalhoResposta = () => {
  const { resposta } = useRespostaStore();
  return (
    <div className="flex justify-between px-2 items-center">
      <span>Resposta</span>
      <div className="flex gap-3">
        {resposta.status > 0 && (
          <span
            className={`${
              resposta.status.toString().startsWith('2')
                ? 'bg-green-600'
                : 'bg-red-600'
            } rounded-xl p-2`}
          >
            Status: {resposta.status} {resposta.status_text}
          </span>
        )}
        {resposta.time > 0 && (
          <span className="bg-gray-400 rounded-xl p-2">
            Time: {resposta.time} ms
          </span>
        )}

        {resposta.size > 0 && (
          <span className="bg-gray-400 rounded-xl p-2">
            Size: {resposta.size} Bytes
          </span>
        )}
      </div>
    </div>
  );
};

export default CabecalhoResposta;
