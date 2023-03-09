import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(updateTime, 1000));
player.setCurrentTime(timeFromLocalStorage()).catch(function (error) {
  console.error(error);
});

function updateTime() {
  player.getCurrentTime().then(function (seconds) {
    timeToLocalStorage(seconds);
  });
}

function timeToLocalStorage(time) {
  localStorage.setItem(LOCALSTORAGE_KEY, time);
}

function timeFromLocalStorage() {
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }
  return 0;
}
