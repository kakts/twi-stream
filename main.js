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
  win = new BrowserWindow({backgroundColor: '2e2c29', width: 800, height: 600});
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
  twClient.stream('statuses/filter', param, (stream) => {
    stream.on('data', (tweet) => {
      console.error("----data", tweet.text);
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
