const time = document.querySelector('.time');
const displayDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
let langSite = 'en';


//date and time

function showTime() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString();
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
    const hours = new Date().getHours();
    if (hours > 5 && hours <12) 
    {return 'morning'} 
    if (hours > 11 && hours <18) 
    {return "afternoon";}
    if (hours >= 17 && hours <24) 
    {return "evening";} 
    if (hours >= 23 && hours <6) 
    {return "night";}
}
function getTimeOfDayLangRu() {
  const hours = new Date().getHours();
  if (hours > 5 && hours <12) 
  {return 'Доброе утро'} 
  if (hours > 11 && hours <18) 
  {return "Добрый день";}
  if (hours >= 17 && hours <24) 
  {return "Добрый вечер";} 
  if (hours >= 23 && hours <6) 
  {return "Доброй ночи";}
}

function showGreeting() {
  if (langSite === "en") {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}`;
  } else if (langSite === "ru") {
    const timeOfDay = getTimeOfDayLangRu();
    greeting.textContent = `${timeOfDay}`;
  }

}

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem("city", city.value);
    localStorage.setItem('langSite', lang);
  }
  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  
    if(localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if (localStorage.getItem("city")) {
        city.value = localStorage.getItem("city");
      } else {
          city.value = "Minsk";
      }
}
  window.addEventListener('load', getLocalStorage);

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


//weather 
const iconWeather = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city')
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const errorInWeather = document.querySelector('.weather-error');


async function getWeather() {
    try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langSite}&appid=60dad502015b535f49d009a7b52a32f4&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    iconWeather.className = 'weather-icon owf';
    iconWeather.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    errorInWeather.textContent = " ";
    if (langSite === "en") {
        wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
    } else if (langSite === 'ru') {
        wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`;
    }
  } catch(error) {
    if (langSite === "en") {errorInWeather.textContent = `Error! City not found! `;
    } else if (langSite === "ru") {errorInWeather.textContent = `Ошибка! Город не найден!`;}

    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}

  city.addEventListener("change", getWeather);
  window.addEventListener("load", getWeather);


  //quote
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeQuote = document.querySelector(".change-quote");
  async function getQuotes() {  
    const quotes = 'data/quote.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const randomQuote = Math.floor(Math.random()* (data.length - 0) + 0);
    if (langSite === "en"){
      quote.textContent = data[randomQuote].textEnLang;
      author.textContent = data[randomQuote].authorEnLang;
    } else if (langSite === "ru") {
      quote.textContent = data[randomQuote].textRuLang;
      author.textContent = data[randomQuote].authorRuLang;
    }

  }
  getQuotes();

  changeQuote.addEventListener("click", getQuotes)


  //settings
  const changeLangRu = document.querySelector(".lang-ru");
  const changeLangEn = document.querySelector(".lang-en");
  const hideTime = document.querySelector(".hide-time");  
  const hideDate = document.querySelector(".hide-date");
  const hideWeather = document.querySelector(".hide-weather");
  const hideGreeting = document.querySelector(".hide-greeting");
  const hideAudio = document.querySelector(".hide-audio");
  const hideQuote = document.querySelector(".hide-quote");
  const btnSettings = document.querySelector(".settings__btn");
  const settingsContainer = document.querySelector(".settings");
  const weather = document.querySelector(".weather");
  const player = document.querySelector(".player");
  const greetingContainer = document.querySelector(".greeting-container");

if (localStorage.getItem('lang') === 'ru' || langSite === "ru") {
  langSite = 'ru';
  nameInput.placeholder = '[Введите ваше имя]';
  changeLangRu.textContent = 'Русский';
  changeLangEn.textContent = 'Английский';
  // changeImgSource.textContent = 'Источник изображения';
  // changeImgSourceGit.textContent = 'Гитхаб';
  // changeImgSourceFlickr.textContent = 'Фликр АПИ';
  // changeImgSourceUnsplash.textContent = 'Анслаш АПИ';
  hideTime.textContent = 'Время';
  hideDate.textContent = 'Дата';
  hideWeather.textContent = 'Погода';
  hideGreeting.textContent = 'Приветствие';
  hideAudio.textContent = 'Плеер';
  hideQuote.textContent = 'Цитата';
};

if (localStorage.getItem('lang') === 'en' || langSite === "en") {
  langSite = "en";
  nameInput.placeholder = '[Enter name]';
  changeLangRu.textContent = ' Russian';
  changeLangEn.textContent = 'English';
  // changeImgSource.textContent = 'Image source';
  // changeImgSourceGit.textContent = 'GitHub';
  // changeImgSourceFlickr.textContent = 'Flickr API';
  // changeImgSourceUnsplash.textContent = 'Unsplash API';
  hideTime.textContent = 'Time';
  hideDate.textContent = 'Date';
  hideQuote.textContent = 'Quote';
  hideWeather.textContent = 'Weather';
  hideGreeting.textContent = 'Greeting';
  hideAudio.textContent = 'Player';
  hideQuote.textContent = 'Quote';
}

function openSettings() {
settingsContainer.classList.toggle('open');
}
function changeLangRuClick(){
  langSite = "ru";
  nameInput.placeholder = '[Введите ваше имя]';
  changeLangRu.textContent = 'Русский';
  changeLangEn.textContent = 'Английский';
  // changeImgSource.textContent = 'Источник изображения';
  // changeImgSourceGit.textContent = 'Гитхаб';
  // changeImgSourceFlickr.textContent = 'Фликр АПИ';
  // changeImgSourceUnsplash.textContent = 'Анслаш АПИ';
  hideTime.textContent = 'Время';
  hideDate.textContent = 'Дата';
  hideWeather.textContent = 'Погода';
  hideGreeting.textContent = 'Приветствие';
  hideAudio.textContent = 'Плеер';
  hideQuote.textContent = 'Цитата';
  showGreeting();
  getWeather();
  getQuotes();
}
function changeLangEnClick(){
  langSite = "en";
  nameInput.placeholder = '[Enter name]';
  changeLangRu.textContent = ' Russian';
  changeLangEn.textContent = 'English';
  // changeImgSource.textContent = 'Image source';
  // changeImgSourceGit.textContent = 'GitHub';
  // changeImgSourceFlickr.textContent = 'Flickr API';
  // changeImgSourceUnsplash.textContent = 'Unsplash API';
  hideTime.textContent = 'Time';
  hideDate.textContent = 'Date';
  hideQuote.textContent = 'Quote';
  hideWeather.textContent = 'Weather';
  hideGreeting.textContent = 'Greeting';
  hideAudio.textContent = 'Player';
  hideQuote.textContent = 'Quote';
  showGreeting();
  getWeather();
  getQuotes();
}
function changeHideWeather() {
  weather.classList.toggle("hide");
}
function changeHideAudio() {
  player.classList.toggle("hide");
}
function changeHideTime() {
  time.classList.toggle("hide");
}
function changeHideDate() {
  displayDate.classList.toggle("hide");
}
function changeHideGreeting() {
  greetingContainer.classList.toggle("hide");
}
function changeHideQuote() {
  quote.classList.toggle("hide");
  author.classList.toggle("hide");
}
btnSettings.addEventListener("click", openSettings);
changeLangRu.addEventListener("click", changeLangRuClick);
changeLangEn.addEventListener("click", changeLangEnClick);
hideWeather.addEventListener("click", changeHideWeather);
hideAudio.addEventListener("click", changeHideAudio);
hideTime.addEventListener("click", changeHideTime);
hideDate.addEventListener("click", changeHideDate);
hideGreeting.addEventListener("click", changeHideGreeting);
hideQuote.addEventListener("click", changeHideQuote);



function setLocalStorageHide() {
  localStorage.setItem('lang', langSite);
  if(weather.classList.contains('hide')){
    localStorage.setItem('weather','hide');
  }else{
    localStorage.removeItem('weather');
  }
  if(displayDate.classList.contains('hide')){
    localStorage.setItem('date','hide');
  }else{
    localStorage.removeItem('date');
  }
  if(time.classList.contains('hide')){
    localStorage.setItem('time','hide');
  }else{
    localStorage.removeItem('time');
  }
  if(greetingContainer.classList.contains('hide')){
    localStorage.setItem('greeting','hide');
  }else{
    localStorage.removeItem('greeting');
  }
  if(quote.classList.contains('hide')){
    localStorage.setItem('quote','hide');
  }else{
    localStorage.removeItem('quote');
  }
  if(author.classList.contains('hide')){
    localStorage.setItem('author','hide');
  }else{
    localStorage.removeItem('author');
  }
  if(player.classList.contains('hide')){
    localStorage.setItem('player','hide');
  }else{
    localStorage.removeItem('player');} 
};

window.addEventListener('beforeunload', setLocalStorageHide);
  
  function getLocalStorageHide() {
    if(localStorage.getItem('weather')) {
      weather.classList.add(localStorage.getItem('weather'));
    }
    if(localStorage.getItem('date')) {
      displayDate.classList.add(localStorage.getItem('date'));
    }
    if(localStorage.getItem('time')) {
      time.classList.add(localStorage.getItem('time'));
    }
    if(localStorage.getItem('greeting')) {
      greetingContainer.classList.add(localStorage.getItem('greeting'));
    }
    if(localStorage.getItem('quote')) {
      quote.classList.add(localStorage.getItem('quote'));
    }
    if(localStorage.getItem('author')) {
      author.classList.add(localStorage.getItem('author'));
    }
    if(localStorage.getItem('player')) {
      player.classList.add(localStorage.getItem('player'));
    }
}
window.addEventListener('load', getLocalStorageHide);

