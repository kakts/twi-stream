const $ = jQuery = require('./src/js/jquery-3.2.1.js');

const {ipcRenderer} = require('electron');
$(() => {

  ipcRenderer.on('tweet', (event, arg) => {
    const tweet = JSON.parse(arg);
    const random = Math.floor( Math.random() * 11 ) ;
    // $('#tw_' + random).remove();
    if (!document.getElementById("tw_" + random)) {
      $('#tweet_disp').prepend('<p id="tw_' + random + '" class="tw"></p>');
    } else {
      $('#tw_' + random).remove();
    }

    $('#tw_' + random).text(tweet.text);
  });
});
