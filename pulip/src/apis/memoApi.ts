import { Memo } from '@models/Memo';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { insertMemoQuery, selectMemoFromCategoryQuery } from '@queries/memoQuery';

export const setMemoApi = async (
  db: SQLiteDatabase,
  categoryId: number,
  memo: Omit<Memo, 'id'>,
) => {
  await db.transaction((tx) => {
    tx.executeSql(insertMemoQuery, [memo.title, memo.content, memo.createdAt, categoryId]);
  });
};

export const getMemosApi = async (db: SQLiteDatabase, categoryId: number) => {
  let memos: Memo[] = [];
  await db.transaction((tx) => {
    tx.executeSql(selectMemoFromCategoryQuery, [categoryId], (_tx, results) => {
      console.log('SQLite: getMemosApi', results.rows.raw());
      memos = results.rows.raw();
    });
  });
  return memos;
};
