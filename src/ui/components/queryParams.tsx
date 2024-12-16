import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { QueryParam } from '@/shared/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2Icon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import useRequisicaoStore from '../store/requisicaoStore';
import { useCallback } from 'react';

const QueryParams = () => {
  const queryParams = useRequisicaoStore(
    (state) => state.requisicao.queryParams
  );
  const addQueryParam = useRequisicaoStore((state) => state.addQueryParam);
  const updateQueryParam = useRequisicaoStore(
    (state) => state.updateQueryParam
  );
  const deleteQueryParam = useRequisicaoStore(
    (state) => state.deleteQueryParam
  );
  const setUrl = useRequisicaoStore((state) => state.setUrl);

  const handleNovoQueryParam = useCallback(() => {
    const novoQueryParam: QueryParam = {
      id: uuidv4(),
      query: '',
      valor: '',
      selecionado: false,
    };

    addQueryParam(novoQueryParam);
  }, [addQueryParam]);

  const atualizaUrl = useCallback(() => {
    const url = useRequisicaoStore.getState().requisicao.url;
    let novaUrl = url;
    const inicioParams = url.indexOf('?');
    const queryParamsAtualizados =
      useRequisicaoStore.getState().requisicao.queryParams;
    const selectedParams = queryParamsAtualizados.filter(
      (param) => param.selecionado
    );
    if (inicioParams > 0) novaUrl = novaUrl.substring(0, inicioParams);
    if (selectedParams) {
      selectedParams.forEach((param) => {
        novaUrl += novaUrl.includes('?')
          ? `&${param.query}=${param.valor}`
          : `?${param.query}=${param.valor}`;
      });
      setUrl(novaUrl);
    }
  }, [setUrl]);

  const handleUpdateQueryParam = useCallback(
    (
      queryParamId: string,
      field: keyof QueryParam,
      value: string | boolean
    ) => {
      const queryParamOriginal = queryParams.find(
        (param) => param.id === queryParamId
      );
      if (queryParamOriginal && queryParamOriginal[field] !== value) {
        updateQueryParam(queryParamId, {
          ...queryParamOriginal,
          [field]: value,
        });

        atualizaUrl();
      }
    },
    [updateQueryParam, queryParams, atualizaUrl]
  );

  const handleDeleteQueryParam = useCallback(
    (queryParamId: string) => {
      deleteQueryParam(queryParamId);
      atualizaUrl();
    },
    [deleteQueryParam, atualizaUrl]
  );

  return (
    <div className="flex flex-col gap-5 p-4">
      <h1>Query Params</h1>
      <div>
        <Table className="table-auto">
          <TableBody>
            {queryParams.map((queryParam) => (
              <TableRow
                className="hover:bg-stone-700 border-none"
                key={queryParam.id}
              >
                <TableCell>
                  <Input
                    className="h-6"
                    type="checkbox"
                    defaultChecked={queryParam.selecionado}
                    onChange={(e) =>
                      handleUpdateQueryParam(
                        queryParam.id,
                        'selecionado',
                        e.target.checked
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="border-0 border-b rounded-none focus-visible:ring-0"
                    defaultValue={queryParam.query}
                    onChange={(e) =>
                      handleUpdateQueryParam(
                        queryParam.id,
                        'query',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="border-0 border-b rounded-none focus-visible:ring-0"
                    defaultValue={queryParam.valor}
                    onChange={(e) =>
                      handleUpdateQueryParam(
                        queryParam.id,
                        'valor',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteQueryParam(queryParam.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button variant="secondary" onClick={handleNovoQueryParam}>
          Novo
        </Button>
      </div>
    </div>
  );
};

export default QueryParams;
