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

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}`;
}

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem("city", city.value);
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