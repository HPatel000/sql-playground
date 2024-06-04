export const SHOWDATABASES = 'SHOW DATABASES;';

export const SHOWTABLESOFDB = (db) => {
  return `SHOW TABLES FROM ${db};`;
};
