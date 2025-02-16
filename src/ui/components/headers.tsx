import { useCallback, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2Icon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import useRequisicaoStore from '../store/requisicaoStore';
import { HeaderDTO } from '@/dtos/header.dto';
import { useHeaderStore } from '../store/headerStore';

const Headers = () => {
  const { headers, addHeader, updateHeader, deleteHeader, fetchHeaders } =
    useHeaderStore();
  const { requisicao } = useRequisicaoStore();

  useEffect(() => {
    fetchHeaders(requisicao.id);
  }, [fetchHeaders, requisicao]);

  const handleNovoHeader = useCallback(() => {
    const novoHeader: HeaderDTO = {
      id: uuidv4(),
      header: '',
      selecionado: false,
      valor: '',
      requisicao_id: requisicao.id,
    };
    addHeader(novoHeader);
  }, [addHeader, requisicao]);

  const handleUpdateHeader = useCallback(
    (headerId: string, field: keyof HeaderDTO, value: string | boolean) => {
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
    <div className="flex flex-col h-full gap-5 p-4">
      <h1>Headers</h1>
      <div className="flex-1 overflow-auto scrollbar-custom">
        <Table>
          <TableBody>
            {headers?.map((header) => (
              <TableRow
                className="hover:bg-stone-400/20 dark:hover:bg-stone-700/50 border-none"
                key={header.id}
              >
                <TableCell>
                  <Input
                    className="h-6 shadow-none"
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
                    className="border-0 border-b rounded-none focus-visible:ring-0 shadow-none"
                    defaultValue={header.header}
                    onBlur={(e) =>
                      handleUpdateHeader(header.id, 'header', e.target.value)
                    }
                    placeholder="header"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="border-0 border-b rounded-none focus-visible:ring-0 shadow-none"
                    defaultValue={header.valor}
                    onBlur={(e) =>
                      handleUpdateHeader(header.id, 'valor', e.target.value)
                    }
                    placeholder="valor"
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
