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

const CabecalhoRequisicao = () => {
  const url = useRequisicaoStore((state) => state.requisicao.url);
  const setUrl = useRequisicaoStore((state) => state.setUrl);
  const tipo = useRequisicaoStore((state) => state.requisicao.tipo);
  const setTipo = useRequisicaoStore((state) => state.setTipo);

  const handleAtualizaUrl = (url: string) => {
    setUrl(url);
  };

  const handleEnviar = () => {
    const requisicao = useRequisicaoStore.getState().requisicao;
    const data = new Date().toLocaleDateString('pt-BR');
    requisicao.data = data;
    console.log(requisicao);
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
