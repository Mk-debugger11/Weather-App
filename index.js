const apiKey = 'b1d0579d30c58c38b4ab1543c5044ebe';
let city = document.getElementById('city');
let searchButton = document.getElementById('button');
let temp = document.getElementById('temp');
let temp2 = document.getElementById('temp2');
let temp3 = document.getElementById('temp3');
let description = document.getElementById('weather-desc-text')
let place = document.querySelector('.place-text')
let date = document.querySelector('.date-text')
let aqiValue = document.querySelector('.aqi-text-value')
let humidityValue = document.querySelector('.humidity-value')
let pressureValue = document.querySelector('.pressure-value')
let df1 = document.querySelector('.df1')
let df2 = document.querySelector('.df2')
let df3 = document.querySelector('.df3')
let df4 = document.querySelector('.df4')
let tf1 = document.querySelector('.tf1')
let tf2 = document.querySelector('.tf2')
let tf3 = document.querySelector('.tf3')
let tf4 = document.querySelector('.tf4')
let weatherImg = document.querySelector('.weather-desc-img')
let imgf1 = document.querySelector('.imgf1')
function setImage(targetElement,descriptionText){
    if(descriptionText === 'clear sky'){
        targetElement.setAttribute('src','images/sun.png')
    }
    else if(descriptionText.includes('clouds')){
        targetElement.setAttribute('src','images/cloudy.png')
    }
    else if(descriptionText.includes('rain')){
        targetElement.setAttribute('src','images/rain.png')
    }
    else if(descriptionText.includes('drizzle')){
        targetElement.setAttribute('src','images/drizzle.png')
    }
    else if(descriptionText.includes('thunderstorm')){
        targetElement.setAttribute('src','images/thunder.png')
    }
    else if(descriptionText.includes('snow')){
        targetElement.setAttribute('src','images/snow.png')
    }
    else{
        targetElement.setAttribute('src','images/fog.png')
    }
}
searchButton.addEventListener('click',(event)=>{ 
    event.preventDefault();  //when the submit button is clicked the event related to a button occurs
    let cityName = city.value;
    //latitude and longitude api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((data)=>{
        if(!data.ok){
            throw new error('City name not found!')
        }
        return data.json()
        
    })
    .then((weatherData)=>{
        let temperature = Math.floor(weatherData.main.temp)
        let descriptionText = weatherData.weather[0].description
        setImage(weatherImg,descriptionText)
        let country = weatherData.sys.country
        let timeStamp = weatherData.dt
        let time = new Date(timeStamp * 1000)
        let day = time.toLocaleDateString("en-US",{day:'numeric',month:'short', weekday:'short'})
        console.log(country)
        console.log(descriptionText);
        temp.innerText = `${temperature}°C`
        // temp1.innerText = `o`;
        // temp2.innerText = `C`;
        description.innerHTML = `<span>${descriptionText}</span>`;
        place.innerText = `${cityName},${country}`;
        date.innerText = `${day}`
        let humidity = weatherData.main.humidity
        humidityValue.innerText = `${humidity} %`
        let pressure = weatherData.main.pressure
        pressureValue.innerText = `${pressure} hPa`
        console.log(weatherData);
        let lat = weatherData.coord.lat
        let lon = weatherData.coord.lon
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((data2)=>{return data2.json()})
        .then((forecastData)=>{
            let requiredData = forecastData.list.filter((ele)=>{return ele.dt_txt.includes('12:00:00')})
            let dateArray = requiredData.map((ele)=>{
                let timeS = ele.dt;
                let timeF = new Date(timeS * 1000);
                let dayF = timeF.toLocaleDateString("en-US",{day:'numeric',month:'short'})
                return dayF
            })
            console.log(requiredData)
            let tempArr = requiredData.map((ele)=>{
                return Math.floor(ele.main.temp)
            })
            let forecastDescImg = requiredData.map((ele)=>{
                return ele.weather[0].description
            })
            console.log(forecastDescImg)
            console.log(tempArr)
            df1.innerText = `${dateArray[1]}`
            df2.innerText = `${dateArray[2]}`
            df3.innerText = `${dateArray[3]}`
            df4.innerText = `${dateArray[4]}`
            tf1.innerText = `${tempArr[1]}°C`
            tf2.innerText = `${tempArr[2]}°C`
            tf3.innerText = `${tempArr[3]}°C`
            tf4.innerText = `${tempArr[4]}°C`
            for(let i = 1;i<=forecastDescImg.length-1;i++){
                const imgId = 'imgf' + i
                let imgID = document.querySelector(`.${imgId}`)
                setImage(imgID,forecastDescImg[i])
            }

        })
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((data1)=>{return data1.json()})
        .then((aqiData)=>{
            let pm2_5 = aqiData.list[0].components.pm2_5
            aqiValue.innerText = `${pm2_5} µg/m³`
        });
        
    })
})