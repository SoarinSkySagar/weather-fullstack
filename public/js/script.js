const form = document.querySelector('form');
const searchQuery = document.querySelector('input');
const locationMsg = document.querySelector('#location');
const weather  = document.querySelector('#weather');
const temp  = document.querySelector('#temp');
const feels  = document.querySelector('#feels');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    locationMsg.textContent = 'Loading...';
    temp.textContent='';
    weather.textContent='';
    feels.textContent='';

    const location = searchQuery.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('Error:',data.error);
            locationMsg.textContent = 'Error: ' + data.error;
        } else {
            locationMsg.textContent = 'Location: '+ data.location;
            temp.textContent = 'Temperature: '+ data.temperature;
            weather.textContent = 'Weather: '+ data.current;
            feels.textContent = 'Feels like: ' + data.feelsLike;
        }
    })
})
})