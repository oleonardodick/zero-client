import { VariavelAmbienteDTO } from '@/dtos/variavelAmbiente.dto';
import { CrudResult } from '@/shared/types';

export const criaVariavelAmbiente = async (data: VariavelAmbienteDTO) => {
  try {
    const resultado: CrudResult = await window.electron.criaVariavelAmbiente(
      data.nome,
      data.valor
    );
    console.log(resultado);
  } catch (erro) {
    console.log(erro);
  }
};

export const atualizaVariavelAmbiente = async (data: VariavelAmbienteDTO) => {
  const resultado: CrudResult = await window.electron.atualizaVariavelAmbiente(
    data.nome,
    data.valor
  );
  console.log(resultado);
};

export const excluiVariavelAmbiente = async (nome: string) => {
  const resultado: CrudResult = await window.electron.excluiVariavelAmbiente(
    nome
  );
  console.log(resultado);
};
