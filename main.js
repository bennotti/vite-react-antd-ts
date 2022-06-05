const { app, BrowserWindow, dialog, ipcMain, Notification } = require("electron");
const { release  } = require("os");
const path = require("path");

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

//process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
// console.log(process.env.NODE_ENV);
const isDevelopment = process.env.NODE_ENV !== 'production';

function createWindow() {
  const mainWin = new BrowserWindow({
    title: 'Main window',
    resizable: false,
    width: 1024,
    show: false,
    height: 768,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWin.webContents.openDevTools();
  mainWin.setAlwaysOnTop(true, 'screen');
  // mainWin.loadFile("dist/index.html");
  mainWin.loadURL(`file://${__dirname}/dist/index.html`);
  mainWin.once('ready-to-show', () => {
    mainWin.show();
  });

  ipcMain.on("close-app", (event, args) => {
    confirmClose(mainWin);
  });

  ipcMain.on("toMain", (event, args) => {
    // fs.readFile("path/to/file", (error, data) => {
    //   // Do something with file contents
  
    //   // Send result back to renderer process
    //   win.webContents.send("fromMain", responseObj);
    // });
    // new Notification({
    //   title: 'teste',
    //   body: 'teste',
    // }).show();

    mainWin.webContents.send("fromMain", 'ok');
  });
  
  // ipcMain.on('request-mainprocess-action', (event, arg) => {
  //   // Displays the object sent from the renderer process:
  //   //{
  //   //    message: "Hi",
  //   //    someData: "Let's go"
  //   //}
  //   console.log(
  //       arg
  //   );
  //   event.sender.send('mainprocess-response', "Hello World!");
  // });
    // const child = new BrowserWindow({ 
      // resizable: false,
    //   width: 300,
    //   height: 300,
    //   parent: mainWindow, 
    //   modal: true, 
    //   show: false,
    //   minimizable: false,
    //   maximizable: false,
    //   autoHideMenuBar: true })
    // child.loadURL('https://github.com')
    // child.once('ready-to-show', () => {
    //   child.show()
    // })
    // child.on('close', async e => {
    //   e.preventDefault()
    
    //   const { response } = await dialog.showMessageBox(child, {
    //     type: 'question',
    //     title: '  Confirm  ',
    //     message: 'Are you sure that you want to close this window?',
    //     buttons: ['Yes', 'No'],
    //   })
    
    //   response === 0 && child.destroy()
    //   mainWindow.show();
    // })
  mainWin.on('close', async e => {
    e.preventDefault();
  
    confirmClose(mainWin);
  });
}

async function confirmClose(janela) {
  const { response } = await dialog.showMessageBox(janela, {
    type: 'question',
    title: '  Confirm  ',
    message: 'Are you sure that you want to close this window?',
    buttons: ['Yes', 'No'],
  });

  response === 0 && janela.destroy();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
