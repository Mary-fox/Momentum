import  playList  from './playList.js';

let isPlay = false;
let playNum = 0;
let currentTime = 0;

const btnAudio = document.querySelector('.play');
const btnNext = document.querySelector('.play-next');
const btnPrev = document.querySelector('.play-prev');
const playListAllSong = document.querySelector('.play-list');
const audio = new Audio();
const playName = document.querySelector('.play-name');
const durationSound = document.querySelector('.play-duration');


function playNameAndDuration() {
    let restoreName = playName.textContent;
    playName.textContent = playList[playNum].title;
    playName.textContent = playList[playNum].title;
    durationSound.textContent = playList[playNum].duration;
    if (restoreName != playList[playNum].title) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = progressInput.value;
    }
}

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
    audio.currentTime = currentTime;
    audio.play();
    btnAudio.classList.toggle('pause');
    selectionSong();
    playNameAndDuration();
    }else {
        audio.pause();
        isPlay = false;
        btnAudio.classList.toggle('pause');
        playNameAndDuration();}
} 
    
btnAudio.addEventListener('click', playOrStopAudio)


function playNext() {
    if (playNum === 2) {playNum = 0} else {
    playNum = playNum + 1}
    audio.src = playList[playNum].src;
    audio.currentTime = currentTime;
    audio.play();
    isPlay = true;
    btnAudio.classList.add('pause');  
    selectionSong()
    playNameAndDuration();
  }
  
function playPrev() {
    if (playNum === 0) {playNum = 2} else {
    playNum = playNum - 1}
    audio.src = playList[playNum].src;
    audio.currentTime = currentTime;

    audio.play();
    isPlay = true;
    btnAudio.classList.add('pause');  
    selectionSong()
    playNameAndDuration();
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



const progressInput = document.querySelector('.play-progress');
const volumeProgress = document.querySelector('.volume-progress');
const volume = document.querySelector('.play-volume');

function changeProgressInput() {
    audio.currentTime = progressInput.value;
};
progressInput.addEventListener('input', changeProgressInput);

function offSoundOnInput() {
    audio.volume = volumeProgress.value;
    if (audio.volume === 0) {
        volume.classList.add('off');
    } else {
        volume.classList.remove('off');
    }
}

volumeProgress.addEventListener('input', offSoundOnInput);


let restoreAudioValue;
function offSound() {
    if (volumeProgress.value != 0) {
        restoreAudioValue = volumeProgress.value;
        audio.volume = 0;
        volumeProgress.value = 0;
        volume.classList.add('off');
    } else {
        volume.classList.remove('off');
        volumeProgress.value = restoreAudioValue;
        audio.volume = volumeProgress.value;
    }
}

volume.addEventListener('click', offSound);

const currentNowTime = document.querySelector('.play-time');



function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};
function updateProgressValue() {
    progressInput.max = audio.duration;
    progressInput.value = audio.currentTime;
    currentNowTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
    setTimeout(updateProgressValue, 1000);
};
updateProgressValue();




