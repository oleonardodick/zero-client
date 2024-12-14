import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { Header } from '@/shared/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2Icon } from 'lucide-react';

const Headers = () => {
  const [headers, setHeaders] = useState<Header[]>();

  useEffect(() => {
    setHeaders([]);
  }, []);

  const handleAdicionarHeader = () => {
    setHeaders((prevHeaders) => [
      ...(prevHeaders || []),
      {
        id: 0,
        selecionado: false,
        header: '',
        valor: '',
      },
    ]);
  };

  const handleExcluirHeader = (index: number) => {
    setHeaders((prevHeaders) => {
      const newHeaders = [...(prevHeaders || [])];
      newHeaders.splice(index, 1);
      return newHeaders;
    });
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <h1>Headers</h1>
      <div>
        <Table>
          <TableBody>
            {headers?.map((header, index) => (
              <TableRow className="hover:bg-transparent border-none">
                <TableCell>
                  <Input
                    className="h-6"
                    type="checkbox"
                    defaultChecked={header.selecionado}
                  />
                </TableCell>
                <TableCell>
                  <Input defaultValue={header.header} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={header.valor} />
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => handleExcluirHeader(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button variant="secondary" onClick={handleAdicionarHeader}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default Headers;
