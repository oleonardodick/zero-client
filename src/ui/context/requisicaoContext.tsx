import { Requisicao } from '@/shared/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface RequisicaoContextProps {
  requisicoes: Requisicao[];
  adicionarRequisicao: (novaRequisicao: Requisicao) => void;
  atualizarRequisicao: (id: string, atualizacao: Partial<Requisicao>) => void;
  removerRequisicao: (id: string) => void;
}

const RequisicaoContext = createContext<RequisicaoContextProps | undefined>(
  undefined
);

interface RequisicaoProviderProps {
  children: ReactNode;
}
export const RequisicaoProvider = ({ children }: RequisicaoProviderProps) => {
  const [requisicoes, setRequisicoes] = useState<Requisicao[]>([]);

  const adicionarRequisicao = (novaRequisicao: Requisicao) => {
    setRequisicoes((prev) => [...prev, novaRequisicao]);
  };

  const atualizarRequisicao = (
    id: string,
    atualizacao: Partial<Requisicao>
  ) => {
    setRequisicoes((prev) =>
      prev.map((requisicao) =>
        requisicao.id === id ? { ...requisicao, ...atualizacao } : requisicao
      )
    );
  };

  const removerRequisicao = (id: string) => {
    setRequisicoes((prev) => prev.filter((requisicao) => requisicao.id !== id));
  };

  return (
    <RequisicaoContext.Provider
      value={{
        requisicoes,
        adicionarRequisicao,
        atualizarRequisicao,
        removerRequisicao,
      }}
    >
      {children}
    </RequisicaoContext.Provider>
  );
};

export const useRequisicao = (): RequisicaoContextProps => {
  const context = useContext(RequisicaoContext);
  if (!context) {
    throw new Error(
      'useRequisicao deve ser usado dentro de um RequisicaoProvider'
    );
  }
  return context;
};
