export const createTableCategoriesQuery = `
CREATE TABLE Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)
`;

export const dropTableCategoriesQuery = 'DROP TABLE IF EXISTS Categories';

export const insertCategoryQuery = 'INSERT INTO Categories (name) VALUES (?);';

export const selectCategoriesQuery = 'SELECT * FROM Categories;';
