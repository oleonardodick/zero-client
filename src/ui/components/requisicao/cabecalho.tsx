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
import { useNavigate } from 'react-router-dom';
import { enviarRequisicao } from '@/ui/communication/requisicao';
import { useQueryClient } from '@tanstack/react-query';
import { TipoRequisicao } from '@/ui/enums/tipoRequisicao.enum';
import { CriaQueryParamsRequisicao } from '@/ui/services/queryParams.service';
import { CriaHeadersRequisicao } from '@/ui/services/headers.service';
import { CriaAutenticacaoRequisicao } from '@/ui/services/autenticacao.service';
import { useQueryParamStore } from '@/ui/store/queryParamsStore';
import { useHeaderStore } from '@/ui/store/headerStore';
import { useAutenticacaoStore } from '@/ui/store/autenticacaoStore';
import { AtualizaResposta, CriaReposta } from '@/ui/services/resposta.service';
import useRespostaStore from '@/ui/store/respostaStore';

const CabecalhoRequisicao = () => {
  const queryClient = useQueryClient();
  const { requisicao, setRequisicao } = useRequisicaoStore();
  const { resposta, setResposta } = useRespostaStore();
  const navigate = useNavigate();

  const handleEnviar = async () => {
    const queryParams = useQueryParamStore.getState().queryParams;
    const headers = useHeaderStore.getState().headers;
    const autenticacao = useAutenticacaoStore.getState().autenticacao;

    const response = await enviarRequisicao(requisicao);
    try {
      const resultado = requisicao.id
        ? await window.electron.atualizaRequisicao(requisicao, requisicao.id)
        : await window.electron.criaRequisicao(requisicao);

      if (resultado.sucesso && resultado.idCriado) {
        const requisicaoId = resultado.idCriado;
        await CriaQueryParamsRequisicao(queryParams, requisicaoId);
        await CriaHeadersRequisicao(headers, requisicaoId);
        if (autenticacao.tipo !== 'none')
          await CriaAutenticacaoRequisicao(autenticacao, requisicaoId);

        if (resposta.requisicao_id !== '') {
          await AtualizaResposta(response, requisicaoId);
        } else {
          await CriaReposta(response, requisicaoId);
        }
        setResposta(response);
        queryClient.invalidateQueries({ queryKey: ['ultimasRequisicoes'] });
        if (!requisicao.id)
          navigate(`/requisicao/modificar/${resultado.idCriado}`);
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  const alteraTipo = (tipo: TipoRequisicao) => {
    setRequisicao({ tipo: tipo });
  };

  return (
    <div className="flex py-4 px-2">
      <Select value={requisicao.tipo} onValueChange={alteraTipo}>
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
        onChange={(e) => setRequisicao({ url: e.target.value })}
        value={requisicao.url}
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
