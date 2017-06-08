const $ = jQuery = require('./jquery-3.2.1.js');

const {ipcRenderer} = require('electron');

$(() => {
  ipcRenderer.on('tweet', (event, arg) => {
    const tweet = JSON.parse(arg);
        console.error("---tweet event occured", tweet);
    const random = Math.floor( Math.random() * 11 ) ;
        $('#tw_' + random).remove();
    $('#tweet_disp').prepend('<p id="tw_' + random + '"></p>');
    $('#tw_' + random).text(tweet.text);
  });
});
