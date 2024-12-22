import { enviarRequisicao } from '../communication/requisicao';
import useRequisicaoStore from '../store/requisicaoStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useRespostaStore from '../store/respostaStore';
import { Resposta } from '@/shared/types';
import { IRepostaCustomizada } from '../interface/IRespostaCustomizada';

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
    // const data = new Date().toLocaleDateString('pt-BR');
    const retorno: IRepostaCustomizada = await enviarRequisicao(requisicao);
    console.log(retorno);
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
    <div className="flex gap-1 py-4 px-2">
      <Select defaultValue={tipo} onValueChange={setTipo}>
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
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
      />
      <Button variant="secondary" onClick={handleEnviar}>
        Enviar
      </Button>
    </div>
  );
};

export default CabecalhoRequisicao;
