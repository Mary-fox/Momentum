import  playList  from './playList.js';

let isPlay = false;
let playNum = 0;

const btnAudio = document.querySelector('.play');
const btnNext = document.querySelector('.play-next');
const btnPrev = document.querySelector('.play-prev');
const playListAllSong = document.querySelector('.play-list');
const audio = new Audio();

function selectionSong() {
    const songItems = document.querySelectorAll('.play-item');
    songItems.forEach((element, key) => {
if (key === playNum) {
  element.classList.add('item-active')
 } else {(element.classList.remove('item-active'))}
    })
 }
function playOrStopAudio() {
    if(!isPlay){
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    btnAudio.classList.toggle('pause');
    selectionSong()
    }else {audio.pause();
        isPlay = false;
        btnAudio.classList.toggle('pause');}
} 
    
btnAudio.addEventListener('click', playOrStopAudio)


function playNext() {
    if (playNum === 2) {playNum = 0} else {
    playNum = playNum + 1}
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    btnAudio.classList.add('pause');  
    selectionSong()
  }
  
function playPrev() {
    if (playNum === 0) {playNum = 2} else {
    playNum = playNum - 1}
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    btnAudio.classList.add('pause');  
    selectionSong()
    }
btnNext.addEventListener('click', playNext)
btnPrev.addEventListener('click', playPrev)  
    
   
playList.forEach(e => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    let itemSong =  Object.values(e);
    li.textContent = `${itemSong[0]}`;
    playListAllSong.append(li);
    })
  

  
audio.addEventListener('ended', playNext);