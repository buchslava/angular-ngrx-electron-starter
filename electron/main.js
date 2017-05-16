const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});

app.on('ready', () => {
  createWindow();

  ipcMain.on('open-from-file', (event, data) => {
    dialog.showOpenDialog({
      title: 'Save todo list',
      filters: [{name: 'Todo list', extensions: ['json']}]
    }, fileNames => {
      if (!fileNames || fileNames.length <= 0) {
        return;
      }

      const fileName = fileNames[0];

      fs.readFile(fileName, 'utf8', (err, content) => {
        if (err) {
          dialog.showErrorBox(`Can't read to file`, err.message);
          return;
        }

        event.sender.send('new-todo-content', content);
      });
    });
  });

  ipcMain.on('save-to-file', (event, data) => {
    dialog.showSaveDialog({
      title: 'Save current todo list',
      defaultPath: '.',
      filters: [{name: 'Todo list', extensions: ['json']}]
    }, fileName => {
      fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
        if (err) {
          dialog.showErrorBox(`Can't write to file`, err.message);
        }
      });
    });
  });
});

app.on('open-file', (event, filePath) => {
  event.preventDefault();

  console.log(filePath);
});
