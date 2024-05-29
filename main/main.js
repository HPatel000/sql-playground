const { app, BrowserWindow, ipcMain } = require('electron');
// const serve = require('electron-serve');
const path = require('path');
const { runQuery, authenticateUser } = require('./backend/sequelize');

// const appServe = app.isPackaged
//   ? serve({
//       directory: path.join(__dirname, '../out'),
//     })
//   : null;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // if (app.isPackaged) {
  //   appServe(win).then(() => {
  //     win.loadURL('app://-');
  //   });
  // } else {
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();
  win.webContents.on('did-fail-load', (e, code, desc) => {
    win.webContents.reloadIgnoringCache();
  });
  // }
};

app.on('ready', () => {
  createWindow();
  ipcMain.handle('execute-sql', async (event, queryInfo) => {
    return runQuery(queryInfo);
  });
  ipcMain.handle('authenticate-user', async (event, userInfo) => {
    return authenticateUser(userInfo);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
