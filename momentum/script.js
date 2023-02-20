const time = document.querySelector('.time');
const displayDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
//date and time
let langSite = 'en';

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
