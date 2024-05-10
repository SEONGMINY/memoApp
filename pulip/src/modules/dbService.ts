import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { createTableCategoriesQuery, dropTableCategoriesQuery } from '@queries/categoryQuery';
import { createTableMemosQuery, dropTableMemosQuery } from '@queries/memoQuery';

export const createTables = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql(createTableCategoriesQuery);
    await db.executeSql(createTableMemosQuery);
    console.log('Tables created successfully');
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};

export const dropTables = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql(dropTableMemosQuery);
    await db.executeSql(dropTableCategoriesQuery);
    console.log('Tables dropped successfully');
  } catch (error) {
    console.error(error);
    throw Error('Failed to drop tables');
  }
};
