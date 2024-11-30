import { db } from '../db.js';
import { CrudResult, IVariavelAmbiente } from '@shared/types.js';

export const buscaTodasVariaveisAmbiente = (): Promise<IVariavelAmbiente> =>
  new Promise((resolve, reject) => {
    db.all(
      'SELECT nome, valor FROM variavelAmbiente',
      [],
      (err, rows: IVariavelAmbiente) => {
        if (err) reject(err.message);
        resolve(rows);
      }
    );
  });

export const criaVariavelAmbiente = (
  nome: string,
  valor: string
): Promise<CrudResult> =>
  new Promise((resolve) => {
    db.run(
      'INSERT INTO variavelAmbiente (nome, valor) VALUES (?, ?)',
      [nome, valor],
      function (err) {
        if (err) resolve({ sucesso: false, erro: err.message });
        resolve({ sucesso: true });
      }
    );
  });

export const atualizaValorVariavelAmbiente = async (
  nome: string,
  valor: string
): Promise<CrudResult> => {
  try {
    return new Promise((resolve) => {
      db.run(
        'UPDATE variavelAmbiente SET valor = ? WHERE nome = ?',
        [valor, nome],
        function (err) {
          if (err) {
            resolve({ sucesso: false, erro: err.message });
          } else if (this.changes === 0) {
            resolve({ sucesso: false, erro: 'Nenhuma linha foi atualizada' });
          } else {
            resolve({ sucesso: true });
          }
        }
      );
    });
  } catch (error) {
    return { sucesso: false, erro: 'Erro inesperado: ' + error };
  }
};

export const excluiVariavelAmbiente = async (
  nome: string
): Promise<CrudResult> => {
  try {
    return new Promise((resolve) => {
      db.run(
        'DELETE FROM variavelAmbiente WHERE nome = ?',
        [nome],
        function (err) {
          if (err) {
            resolve({ sucesso: false, erro: err.message });
          } else if (this.changes === 0) {
            resolve({ sucesso: false, erro: 'Nenhuma linha foi excluída' });
          } else {
            resolve({ sucesso: true });
          }
        }
      );
    });
  } catch (error) {
    return { sucesso: false, erro: 'Erro inesperado: ' + error };
  }
};
