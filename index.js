const apiKey = 'b1d0579d30c58c38b4ab1543c5044ebe';
let city = document.getElementById('city');
let searchButton = document.getElementById('button');
let temp = document.getElementById('temp');
let temp2 = document.getElementById('temp2');
let temp3 = document.getElementById('temp3');
let description = document.getElementById('weather-desc-text')
let place = document.querySelector('.place-text')
let date = document.querySelector('.date-text')
searchButton.addEventListener('click',(event)=>{
    event.preventDefault();  //when the submit button is clicked the event related to a button occurs
    let cityName = city.value;
    //latitude and longitude api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((data)=>{
        if(!data.ok){
            return "City name not found"
        }
        return data.json()
        
    })
    .then((weatherData)=>{
        let temperature = Math.floor(weatherData.main.temp)
        let descriptionText = weatherData.weather[0].description
        let country = weatherData.sys.country
        let timeStamp = weatherData.dt
        let time = new Date(timeStamp * 1000)
        let day = time.toLocaleDateString("en-US",{weekday:'long'})
        console.log(country)
        console.log(descriptionText);
        temp.innerText = `${temperature}`
        temp1.innerText = `o`;
        temp2.innerText = `C`;
        description.innerHTML = `<span>${descriptionText}</span>`;
        place.innerText = `${cityName},${country}`;
        date.innerText = `${day}`
        console.log(weatherData);
    })
})