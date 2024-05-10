import { Database } from 'sqlite3';
import { ResultSet } from 'react-native-sqlite-storage';

const sqlite3 = require('sqlite3').verbose();

export class SQLiteExecutor {
  constructor() {}
  public static openDatabase(name: string): DatabaseExecutor {
    return new DatabaseExecutor(name);
  }
}

export class DatabaseExecutor {
  private db: Database;
  constructor(name: string) {
    this.db = new sqlite3.Database(name);
  }

  public transaction(callback: (tx: TransactionExecutor) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = new TransactionExecutor(this.db, resolve, reject);
      this.db.serialize(() => {
        callback(transaction);
      });
    });
  }

  // provide interface for calling executeSql method which returns Promise<ResultSet[]>
  public executeSql(sqlStatement: string, args?: any[]): Promise<[ResultSet]> {
    return new Promise((resolve, reject) => {
      this.db.all(sqlStatement, args, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        }

        // Assuming rows is an array of objects representing the result set
        const resultSet: ResultSet = {
          insertId: 0, // Assuming the first row has an id field
          rowsAffected: 0, // Assuming no rows are affected
          rows: {
            length: rows.length,
            raw: () => rows,
            item: (index: number) => rows[index],
          },
        };
        resolve([resultSet]);
      });
    });
  }

  public close() {
    this.db.close();
  }
}

export class TransactionExecutor {
  private db: Database;
  private resolve: () => void;
  private reject: (mess: any) => void;
  private callsAmount = 0;
  constructor(_db: Database, _resolve: (value?: unknown) => void, _reject: (reason?: any) => void) {
    this.db = _db;
    this.resolve = _resolve;
    this.reject = _reject;
  }

  public executeSql(
    statement: string,
    args?: string[],
    callback?: (tx: TransactionExecutor, results: ResultSet) => void,
    errorCallback?: (tx: TransactionExecutor, results: any) => void,
  ): void {
    this.callsAmount++;
    // sqlite3 have many dedicated methods for calling sql, but 'all' is quite universal
    this.db.all(statement, args, (err: any, rows: any[]) => {
      if (err) {
        if (errorCallback) {
          errorCallback(this, err);
        }
        this.reject(err);
      }

      const tmp: ResultSet = {
        insertId: rows[0]?.id || 0,
        rowsAffected: 0,
        rows: {
          length: rows.length,
          raw: () => rows,
          item: (index: number) => rows[index],
        },
      };
      if (callback) {
        callback(this, tmp);
      }

      this.callsAmount--;

      if (this.callsAmount == 0) {
        this.resolve();
      }
    });
  }
}
