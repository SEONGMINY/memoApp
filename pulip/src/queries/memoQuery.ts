export const createTableMemosQuery = `
  CREATE TABLE Memos (
  id	INTEGER,
  title	TEXT NOT NULL,
  content	TEXT,
  createdAt	TEXT NOT NULL,
  categoryId	INTEGER,
  FOREIGN KEY(categoryId) REFERENCES Categories(id),
  PRIMARY KEY(id AUTOINCREMENT)
)`;

export const dropTableMemosQuery = 'DROP TABLE IF EXISTS Memos';

export const insertMemoQuery =
  'INSERT INTO Memos (title, content, createdAt, categoryId) VALUES (?, ?, ?, ?)';

export const selectMemoFromCategoryQuery = 'SELECT * FROM Memos WHERE categoryId = ?';
