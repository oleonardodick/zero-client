import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { IQueryParams } from '@/shared/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2Icon } from 'lucide-react';

const paramsData: IQueryParams[] = [
  {
    selecionado: true,
    query: 'nome',
    valor: 'leonardo',
  },
  {
    selecionado: false,
    query: 'idade',
    valor: '29',
  },
  {
    selecionado: true,
    query: 'cor',
    valor: 'azul',
  },
];
const QueryParams = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams[]>();

  useEffect(() => {
    setQueryParams(paramsData);
  }, []);

  const handleAdicionarQueryParam = () => {
    setQueryParams((prevQueryParams) => [
      ...(prevQueryParams || []),
      {
        selecionado: false,
        query: '',
        valor: '',
      },
    ]);
  };

  const handleExcluirQueryParam = (index: number) => {
    setQueryParams((prevQueryParams) => {
      const newParams = [...(prevQueryParams || [])];
      newParams.splice(index, 1);
      return newParams;
    });
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <h1>Query Params</h1>
      <div>
        <Table className="table-auto">
          <TableBody>
            {queryParams?.map((queryParam, index) => (
              <TableRow
                className="hover:bg-transparent border-none"
                key={queryParam.query}
              >
                <TableCell>
                  <Input
                    className="h-6"
                    type="checkbox"
                    defaultChecked={queryParam.selecionado}
                  />
                </TableCell>
                <TableCell>
                  <Input defaultValue={queryParam.query} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={queryParam.valor} />
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => handleExcluirQueryParam(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button variant="secondary" onClick={handleAdicionarQueryParam}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default QueryParams;
