'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [userState, setUserState] = useState({
    username: 'root',
    password: 'root',
  });

  const [db, setDB] = useState('world');

  const setCurrDB = (db) => {
    // TODO check if DB present
    setDB(db);
  };

  const setCurrUserInfo = (username, password) => {
    setUserState({
      username,
      password,
    });
  };

  const runQuery = async (query) => {
    return await window.ipcRenderer.invoke('execute-sql', {
      query: query,
      username: userState.username,
      password: userState.password,
      db: db,
    });
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
