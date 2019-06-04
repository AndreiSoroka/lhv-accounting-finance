import sqlite3 from 'sqlite3';

const { DATABASE_PATH } = process.env;

class Database {
  constructor() {
    this.db = new sqlite3.Database(DATABASE_PATH, 'OPEN_READWRITE');
    this.db.configure('busyTimeout', 15 * 1000);
  }

  getTransactionEquivalent() {
    const select = `
      SELECT t.*
      FROM transaction_equivalent t
      LIMIT 100
    `;

    return new Promise((resolve, reject) => {
      this.db.all(select, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }
}


export default new Database();
