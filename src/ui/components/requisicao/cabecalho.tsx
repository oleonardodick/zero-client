import useRequisicaoStore from '@/ui/store/requisicaoStore';
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
import { RequisicaoDTO } from '@/dtos/requisicao.dto';
import { CrudResult } from '@/shared/types';
import { useNavigate } from 'react-router-dom';
import { enviarRequisicao } from '@/ui/communication/requisicao';
import useRespostaStore from '@/ui/store/respostaStore';
import { useQueryClient } from '@tanstack/react-query';

const CabecalhoRequisicao = () => {
  const queryClient = useQueryClient();
  const url = useRequisicaoStore((state) => state.requisicao.url);
  const tipo = useRequisicaoStore((state) => state.requisicao.tipo);
  const setUrl = useRequisicaoStore((state) => state.setUrl);
  const setTipo = useRequisicaoStore((state) => state.setTipo);
  const inicializaResposta = useRespostaStore(
    (state) => state.inicializaResposta
  );
  const navigate = useNavigate();

  const handleAtualizaUrl = (url: string) => {
    setUrl(url);
  };

  const handleEnviar = async () => {
    const requisicao = useRequisicaoStore.getState().requisicao;
    const queryParams = useRequisicaoStore.getState().queryParams;
    const headers = useRequisicaoStore.getState().headers;
    const autenticacao = useRequisicaoStore.getState().autenticacao;
    const requisicaoEnviar = new RequisicaoDTO(
      requisicao.url,
      requisicao.tipo,
      requisicao.jsonEnvio,
      requisicao.nome || requisicao.url,
      undefined,
      queryParams,
      headers,
      autenticacao,
      requisicao.id
    );
    const resposta = await enviarRequisicao(requisicaoEnviar);
    try {
      let resultado: CrudResult;

      if (requisicao) {
        resultado = requisicao.id
          ? await window.electron.atualizaRequisicao(requisicaoEnviar)
          : await window.electron.criaRequisicao(requisicaoEnviar);
        if (resultado.sucesso && resultado.idCriado) {
          const result = await window.electron.criaResposta(
            resposta,
            resultado.idCriado
          );
          console.log(resposta, resultado, result);
          inicializaResposta(resposta);
          queryClient.invalidateQueries({ queryKey: ['ultimasRequisicoes'] });
          navigate(`/requisicao/modificar/${resultado.idCriado}`);
        }
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <div className="flex py-4 px-2">
      <Select defaultValue={tipo} onValueChange={setTipo}>
        <SelectTrigger className="w-32 rounded-none">
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
        className="rounded-none"
      />
      <Button
        variant="default"
        onClick={handleEnviar}
        className="rounded-none w-32"
      >
        Enviar
      </Button>
    </div>
  );
};

export default CabecalhoRequisicao;
