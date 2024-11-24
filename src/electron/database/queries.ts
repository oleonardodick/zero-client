import { db } from './db.js';

export const getItems = (): Promise<any[]> =>
  new Promise((resolve, reject) => {
    db.all('SELECT name FROM items', [], (err, rows) => {
      if (err) reject(err.message);
      resolve(rows);
    });
  });

export const addItem = (name: string): Promise<number> =>
  new Promise((resolve, reject) => {
    db.run('INSERT INTO items (name) VALUES (?)', [name], function (err) {
      if (err) reject(err.message);
      resolve(this.lastID);
    });
  });
