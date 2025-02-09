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
import { CriaRequisicaoDTO } from '@/dtos/requisicao.dto';
import { useNavigate } from 'react-router-dom';
import { enviarRequisicao } from '@/ui/communication/requisicao';
import useRespostaStore from '@/ui/store/respostaStore';
import { useQueryClient } from '@tanstack/react-query';
import { TipoRequisicao } from '@/ui/enums/tipoRequisicao.enum';
import { CriaQueryParamsRequisicao } from '@/ui/services/queryParams.service';
import { CriaHeadersRequisicao } from '@/ui/services/headers.service';
import { CriaAutenticacaoRequisicao } from '@/ui/services/autenticacao.service';
import { useQueryParamStore } from '@/ui/store/queryParamsStore';
import { useHeaderStore } from '@/ui/store/headerStore';
import { useAutenticacaoStore } from '@/ui/store/autenticacaoStore';

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
    const queryParams = useQueryParamStore.getState().queryParams;
    const headers = useHeaderStore.getState().headers;
    const autenticacao = useAutenticacaoStore.getState().autenticacao;

    const requisicaoEnviar: CriaRequisicaoDTO = {
      url: requisicao.url,
      tipo: requisicao.tipo,
      jsonEnvio: requisicao.jsonEnvio,
      nome: requisicao.nome || requisicao.url,
    };

    const resposta = await enviarRequisicao(requisicaoEnviar);
    try {
      const resultado = requisicao.id
        ? await window.electron.atualizaRequisicao(
            requisicaoEnviar,
            requisicao.id
          )
        : await window.electron.criaRequisicao(requisicaoEnviar);

      if (resultado.sucesso && resultado.idCriado) {
        const requisicaoId = resultado.idCriado;
        await CriaQueryParamsRequisicao(queryParams, requisicaoId);
        await CriaHeadersRequisicao(headers, requisicaoId);
        if (autenticacao.tipo !== 'none')
          await CriaAutenticacaoRequisicao(autenticacao, requisicaoId);

        await window.electron.criaResposta(resposta, resultado.idCriado);
        inicializaResposta(resposta);
        queryClient.invalidateQueries({ queryKey: ['ultimasRequisicoes'] });
        navigate(`/requisicao/modificar/${resultado.idCriado}`);
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <div className="flex py-4 px-2">
      <Select value={tipo} onValueChange={setTipo}>
        <SelectTrigger className="w-32 rounded-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={TipoRequisicao.GET}>GET</SelectItem>
            <SelectItem value={TipoRequisicao.POST}>POST</SelectItem>
            <SelectItem value={TipoRequisicao.PUT}>PUT</SelectItem>
            <SelectItem value={TipoRequisicao.PATCH}>PATCH</SelectItem>
            <SelectItem value={TipoRequisicao.DELETE}>DELETE</SelectItem>
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
