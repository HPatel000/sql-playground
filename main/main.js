const { error } = require('console');
const { app, BrowserWindow, ipcMain } = require('electron');
// const serve = require('electron-serve');
const path = require('path');
const { Sequelize } = require('sequelize');

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

  ipcMain.handle('execute-sql', async (event, query) => {
    const sequelize = new Sequelize('world', 'root', 'root', {
      dialect: 'mysql',
      host: 'localhost',
    });

    try {
      const [result, metadata] = await sequelize.query(query);
      return {
        data: result,
      };
    } catch (e) {
      return {
        error: e,
      };
    }

    // return new Promise((resolve, reject) => {
    //   sequelize.query(query, (error, results) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(results);
    //     }
    //     sequelize.end();
    //   });
    // });
  });
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
