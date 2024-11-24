import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';

const dbPath: string = path.join(
  app.getAppPath(),
  '/dist-electron/database/data.db'
);

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erro de conexão no banco de dados: ', err.message);
  else {
    console.log('Conectado no banco de dados');

    db.run(
      `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)`,
      (errCreate) => {
        if (errCreate) {
          console.error('Erro ao criar a tabela:', errCreate);
          return;
        }

        console.log('Tabela criada com sucesso.');
      }
    );
  }
});
