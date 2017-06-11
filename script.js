const $ = jQuery = require('./src/js/jquery-3.2.1.js');

const {ipcRenderer} = require('electron');
const laneMap = {}
$(() => {
  for (let i = 0; i < 10; i++) {
    laneMap[i] = false;
  }

  ipcRenderer.on('tweet', (event, arg) => {
    const tweet = JSON.parse(arg);
    const tweetUser = tweet.user;
    let random = Math.floor( Math.random() * 11 );
    // if lane is used, recompute the random number.
    let reCount = 0;
    while (laneMap[random]) {
      if (reCount > 3) {
        console.warn("[reCount] over 3");
        return;
      }
      reCount++;
      random = Math.floor(Math.random() * 11);
    }
    // $('#tw_' + random).remove();
    if (!document.getElementById("tw_" + random)) {
      $('#tweet_disp').append('<p id="tw_' + random + '" class="tw"></p>');
    } else {
      $('#tw_' + random).remove();
    }
    laneMap[random] = true;
    const thumbUrl = tweetUser.profile_image_url;
    $('#tweet_disp').children('#tw_' + random).prepend('<img src="' + thumbUrl + '" class="userThumb">' + tweet.text);

    setTimeout(() => {
      laneMap[random] = false;
      $('#tw_' + random).text("");
      console.error('---- lanemap deltete', laneMap)
    }, 7000);
  });
});


function FormSubmit() {
  console.error("----form submit");

  let word = $('#search_word [name=word]').val();
  ipcRenderer.send('searchRefresh', word);
}
