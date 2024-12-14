import { useCallback } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { Header } from '@/shared/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2Icon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import useRequisicaoStore from '../store/requisicaoStore';

const Headers = () => {
  const headers = useRequisicaoStore((state) => state.requisicao.header);
  const addHeader = useRequisicaoStore((state) => state.addHeader);
  const updateHeader = useRequisicaoStore((state) => state.updateHeader);
  const deleteHeader = useRequisicaoStore((state) => state.deleteHeader);

  const handleNovoHeader = useCallback(() => {
    const novoHeader: Header = {
      id: uuidv4(),
      header: '',
      valor: '',
      selecionado: false,
    };
    addHeader(novoHeader);
  }, [addHeader]);

  const handleUpdateHeader = useCallback(
    (headerId: string, field: keyof Header, value: string | boolean) => {
      const headerOriginal = headers.find((header) => header.id === headerId);
      if (headerOriginal && headerOriginal[field] !== value) {
        updateHeader(headerId, { ...headerOriginal, [field]: value });
      }
    },
    [updateHeader, headers]
  );

  const handleExcluirHeader = useCallback(
    (id: string) => {
      deleteHeader(id);
    },
    [deleteHeader]
  );

  return (
    <div className="flex flex-col gap-5 p-4">
      <h1>Headers</h1>
      <div>
        <Table>
          <TableBody>
            {headers?.map((header) => (
              <TableRow
                className="hover:bg-transparent border-none"
                key={header.id}
              >
                <TableCell>
                  <Input
                    className="h-6"
                    type="checkbox"
                    defaultChecked={header.selecionado}
                    onChange={(e) =>
                      handleUpdateHeader(
                        header.id,
                        'selecionado',
                        e.target.checked
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    defaultValue={header.header}
                    onBlur={(e) =>
                      handleUpdateHeader(header.id, 'header', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    defaultValue={header.valor}
                    onBlur={(e) =>
                      handleUpdateHeader(header.id, 'valor', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => handleExcluirHeader(header.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button variant="secondary" onClick={handleNovoHeader}>
          Novo
        </Button>
      </div>
    </div>
  );
};

export default Headers;
