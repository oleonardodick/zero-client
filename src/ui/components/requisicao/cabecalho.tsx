import { CrudResult, Resposta } from '@/shared/types';
import { enviarRequisicao } from '@/ui/communication/requisicao';
import { IRepostaCustomizada } from '@/ui/interface/IRespostaCustomizada';
import useRequisicaoStore from '@/ui/store/requisicaoStore';
import useRespostaStore from '@/ui/store/respostaStore';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const CabecalhoRequisicao = () => {
  const url = useRequisicaoStore((state) => state.requisicao.url);
  const setUrl = useRequisicaoStore((state) => state.setUrl);
  const tipo = useRequisicaoStore((state) => state.requisicao.tipo);
  const setTipo = useRequisicaoStore((state) => state.setTipo);
  const setResposta = useRespostaStore((state) => state.setResposta);

  const handleAtualizaUrl = (url: string) => {
    setUrl(url);
  };

  const handleEnviar = async () => {
    const requisicao = useRequisicaoStore.getState().requisicao;
    try {
      let resultado: CrudResult;

      if (requisicao) {
        resultado = await window.electron.criaRequisicao(requisicao);
        console.log(resultado);
      }
    } catch (erro) {
      console.log(erro);
    }
    // const data = new Date().toLocaleDateString('pt-BR');
    const retorno: IRepostaCustomizada = await enviarRequisicao(requisicao);
    const resposta: Resposta = {
      idRequisicao: requisicao.id,
      jsonRetorno: JSON.stringify(retorno.axiosResponse.data, null, 2),
      status: retorno.axiosResponse.status,
      statusText: retorno.axiosResponse.statusText,
      size: retorno.size,
      time: retorno.time,
    };
    setResposta(resposta);
  };

  return (
    <div className="flex py-4 px-2">
      <Select defaultValue={tipo} onValueChange={setTipo}>
        <SelectTrigger className="w-32 rounded-none border-stone-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-stone-700 text-stone-300 border-stone-500">
          <SelectGroup>
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
            <SelectItem value="put">PUT</SelectItem>
            <SelectItem value="patch">PATCH</SelectItem>
            <SelectItem value="delete">DELETE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder="URL"
        onChange={(e) => handleAtualizaUrl(e.target.value)}
        value={url}
        id="urlInput"
        className="rounded-none border-stone-500"
      />
      <Button
        variant="secondary"
        onClick={handleEnviar}
        className="rounded-none w-32 bg-indigo-500 hover:bg-indigo-600"
      >
        Enviar
      </Button>
    </div>
  );
};

export default CabecalhoRequisicao;
