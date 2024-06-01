'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  // TODO
  const [userState, setUserState] = useState({
    username: 'root',
    password: 'root',
  });

  // TODO
  const [db, setDB] = useState('world');

  const setCurrDB = async (db) => {
    const res = await runQuery(`SHOW DATABASES LIKE '${db}'`);
    if (!res.error && res.data.length != 0) {
      setDB(db);
    }
  };

  const setCurrUserInfo = (username, password) => {
    setUserState({
      username,
      password,
    });
  };

  const runQuery = async (query) => {
    const res = await window.ipcRenderer.invoke('execute-sql', {
      query: query,
      username: userState.username,
      password: userState.password,
      db: db,
    });
    const regex = /^use /i;
    if (query.match(regex)) {
      if (!res.error) {
        const regex = /^use\s+(\w+)(?:;)?/i;
        const db = query.match(regex);
        setCurrDB(db[1]);
      }
    }
    return res;
  };

  const authenticate = async (userInfo) => {
    return await window.ipcRenderer.invoke('authenticate-user', userInfo);
  };

  return (
    <AppContext.Provider
      value={{
        userState,
        db,
        setCurrDB,
        setCurrUserInfo,
        runQuery,
        authenticate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
