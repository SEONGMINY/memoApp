import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { SQLiteExecutor } from '@modules/SQLiteExecutor';
import { getCategories, setCategory } from '@apis/categoryApi';
import { createTables, dropTables } from '@modules/dbService';
import { getMemosApi, setMemoApi } from '@apis/memoApi';
import dayjs from 'dayjs';

describe('SQLite 테스트 코드', () => {
  let db: SQLiteDatabase;
  let categoryId: number;

  beforeAll(async () => {
    db = SQLiteExecutor.openDatabase('pulipDB.db') as unknown as SQLiteDatabase;
    await dropTables(db);
    await createTables(db);
  });

  test('categories 테이블 쿼리 테스트', async () => {
    await getCategories(db);
    await setCategory(db, 'test');
    const categories = await getCategories(db);
    categoryId = categories[0]?.id;

    expect(categories.length).toEqual(1);
  });

  test('memos 테이블 쿼리 테스트', async () => {
    const memo = {
      title: 'test tile',
      content: 'test content',
      createdAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    await setMemoApi(db, categoryId, memo);
    const memos = await getMemosApi(db, categoryId);

    expect(memos.length).toEqual(1);
  });

  afterAll(() => {
    db.close();
  });
});
