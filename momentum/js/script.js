const time = document.querySelector('.time');
const displayDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
let langSite = 'en';


//date and time

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting()
    setTimeout(showTime, 1000);
  }
showTime();

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
  
    let timeLang;
    if (langSite === "ru")  timeLang='ru-Ru';
    else if (langSite === "en")  timeLang='en-Us';
    const currentDate = date.toLocaleDateString(`${timeLang}`, options);
    displayDate.textContent = currentDate;
  }

//greeting
const nameInput = document.querySelector('.name'); 

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours <12) 
    {return 'morning'} 
    if (hours > 11 && hours <18) 
    {return "afternoon";}
    if (hours >= 17 && hours <24) 
    {return "evening";} 
    if (hours >= 23 && hours <6) 
    {return "night";}
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)


 //slider
let randomNum = getRandomNum();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getRandomNum() {
    return Math.floor(Math.random()* (21 - 1) + 1); //получаем рандомное число от 1 до 20
 };
function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0"); //Переменная bgNum формируется на основе рандомного числа, дополняя его слева нулями, если число однозначное.
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Mary-fox/image-for-momentum/main/images/${timeOfDay}/${bgNum}.jpg`
    //Чтобы избежать моментов, когда фоновое изображение ещё не загрузилось, но уже используется как фоновое, 
    //необходимо указывать его фоном страницы только после полной загрузки. Для чего используем событие load
    img.onload = () => {      
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/Mary-fox/image-for-momentum/main/images/${timeOfDay}/${bgNum}.jpg')`
      }; 
}
setBg();

function getSlideNext() {
    if (randomNum === 20) randomNum = 1;
    else randomNum = randomNum + 1;
    setBg();
}

function getSlidePrev() {
    if (randomNum > 1) randomNum = randomNum - 1;
    else if (randomNum === 1) randomNum = 20;
    setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);