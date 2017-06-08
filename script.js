const $ = jQuery = require('./jquery-3.2.1.js');

const {ipcRenderer} = require('electron');

console.error("----ipcMain", ipcRenderer)
$(() => {
  console.error("----hello")
  ipcRenderer.on('tweet', (event, arg) => {
    const tweet = JSON.parse(arg);
        console.error("---tweet event occured", tweet);
    $('#tweet_disp').prepend('<p id="tw_' + tweet.id_str + '"></p>');
    $('#tw_' + tweet.id_str).text(tweet.text);
  });
});
