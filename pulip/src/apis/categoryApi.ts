import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Category } from '@models/Category';
import { insertCategoryQuery, selectCategoriesQuery } from '@queries/categoryQuery';

export const setCategory = async (db: SQLiteDatabase, categoryName: string) => {
  await db.transaction((tx) => {
    tx.executeSql(insertCategoryQuery, [categoryName]);
  });
};

export const getCategories = async (db: SQLiteDatabase) => {
  let categories: Category[] = [];
  await db.transaction((tx) => {
    tx.executeSql(selectCategoriesQuery, [], (_tx, results) => {
      console.log('SQLite: getCategories', results.rows.raw());
      categories = results.rows.raw();
    });
  });

  return categories;
};
