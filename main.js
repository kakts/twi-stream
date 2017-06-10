const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path');
const url = require('url');

const twConfig = require('./conf/config');

const twitter = require('twitter');
const twClient = new twitter(twConfig);

let win;
console.error(electron);
function createWindow() {
  console.log('[ready] event emitted.');
  win = new BrowserWindow({width: 800, height: 600, frame: false});
  win.show()
  // load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();
  const param = {
    track: 'nintendo'
  };
  const STREAM_API_PATHS = {
    FILTER: 'statuses/filter',
    USER: 'user'
  };
  twClient.stream(STREAM_API_PATHS.USER, param, (stream) => {
    stream.on('data', (tweet) => {
      win.webContents.send('tweet', JSON.stringify(tweet));
    });

    stream.on('error', (error) => {
      console.error(error);
    });
  });


  win.on('closed', () => {
    console.log('[closed] event emitted.');
    // Dereference the window object.
    win = null;
  });
}

// This method will be called when Electron has finished initialization
// and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  console.log('[window-all-closed] event emitted.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault();
  callback('username', 'secret')
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
