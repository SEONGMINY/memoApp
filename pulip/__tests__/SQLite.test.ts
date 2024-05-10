import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { SQLiteExecutor } from '@modules/SQLiteExecutor';
import { getCategories, setCategory } from '@apis/categoryApi';
import { createTables, dropTables } from '@modules/dbService';

describe('SQLite 테스트 코드', () => {
  let db: SQLiteDatabase;

  beforeAll(async () => {
    db = SQLiteExecutor.openDatabase('pulipDB.db') as unknown as SQLiteDatabase;
    await dropTables(db);
    await createTables(db);
  });

  test('categories 테이블 쿼리 테스트', async () => {
    await getCategories(db);
    await setCategory(db, 'test');
    const categories = await getCategories(db);

    expect(categories.length).toEqual(1);
  });

  afterAll(() => {
    db.close();
  });
});
