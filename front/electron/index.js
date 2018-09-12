const index       = require('electron')
  , app           = index.app
  , BrowserWindow = index.BrowserWindow

let mainWindow = null

app.on('window-all-closed', _ => process.platform !== 'darwin' ? app.quit() : false)
app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/../public/index.html')
  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})