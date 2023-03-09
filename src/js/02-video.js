import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

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
  localStorage.setItem('videoplayer-current-time', time);
}

function timeFromLocalStorage() {
  if (localStorage.getItem('videoplayer-current-time')) {
    return localStorage.getItem('videoplayer-current-time');
  }
  return 0;
}
