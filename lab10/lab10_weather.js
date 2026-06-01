let totalCards = 0;
let currentIndex = 0;
const itemsPerPage = 3;
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cityNameSpan = document.getElementById('cityNameDisplay');
const coordsHintSpan = document.getElementById('coordsHint');
const statusDiv = document.getElementById('statusMessage');

function getWeekday(dateStr)
{
    const date = new Date(dateStr);
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return weekdays[date.getDay()];
}

function getWeatherDescription(code) 
{
    const codes = 
    {
        0: "Ясно", 1: "В основном ясно", 2: "Переменная облачность", 3: "Пасмурно",
        45: "Туман", 48: "Иней", 51: "Слабая морось", 53: "Умеренная морось", 55: "Густая морось",
        61: "Дождь слабый", 63: "Дождь умеренный", 65: "Дождь сильный",
        71: "Снег слабый", 73: "Снег умеренный", 75: "Снег сильный",
        80: "Ливень слабый", 81: "Ливень умеренный", 82: "Ливень сильный",
        95: "Гроза", 96: "Гроза с градом", 99: "Сильная гроза"
    };
    return codes[code] || "Облачно";
}

function initCarouselDOM(days) 
{
    track.innerHTML = '';
    totalCards = days.length;
    days.forEach(day => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        const description = getWeatherDescription(day.weatherCode);
        const parts = day.date.split('-');
        let formattedDate = day.date;
        if (parts.length === 3)
            formattedDate = `${parts[2]}.${parts[1]}`;
        card.innerHTML = 
        `   <div class="card-date">${formattedDate}</div>
            <div class="card-weekday">${day.weekday}</div>
            <div class="temp">${Math.round(day.tempMax)}° / ${Math.round(day.tempMin)}°</div>
            <div class="weather-desc">${description}</div>
            <div class="details">
                <div class="wind">Ветер: ${Math.round(day.windSpeed)} м/с</div>
            </div>`;
        track.appendChild(card);
    });
    currentIndex = 0;
    updateCarousel();
}

function updateCarousel() 
{
    if (totalCards === 0) 
        return;
    const maxIndex = Math.max(0, totalCards - itemsPerPage);
    if (currentIndex > maxIndex) 
        currentIndex = maxIndex;
    if (currentIndex < 0) 
        currentIndex = 0;
    const containerWidth = track.parentElement.clientWidth;
    const cardWidth = (containerWidth - 32) / itemsPerPage; 
    const stepTranslate = currentIndex * (cardWidth + 16); 
    track.style.transform = `translateX(-${stepTranslate}px)`;
    if (currentIndex <= 0) 
    {
        prevBtn.disabled = true;
        prevBtn.style.opacity = "0.3";
    } 
    else 
    {
        prevBtn.disabled = false;
        prevBtn.style.opacity = "1";
    }
    if (currentIndex >= maxIndex) 
    {
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.3";
    } 
    else 
    {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
    }
}

function nextSlide()
{
    const maxIndex = Math.max(0, totalCards - itemsPerPage);
    if (currentIndex < maxIndex) 
    {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() 
{
    if (currentIndex > 0) 
    {
        currentIndex--;
        updateCarousel();
    }
}

async function fetchWeather(lat, lon, cityNameForDisplay) 
{
    statusDiv.innerHTML = `Загрузка прогноза для ${cityNameForDisplay}...`;
    cityNameSpan.innerText = cityNameForDisplay;
    coordsHintSpan.innerText = `${lat}°, ${lon}°`;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    try 
    {
        const response = await fetch(url);
        if (!response.ok) 
            throw new Error(`Ошибка сервера: ${response.status}`);
        const data = await response.json();
        const daily = data.daily;
        const codesArray = daily.weather_code;
        const forecastArray = [];
        for (let i = 0; i < daily.time.length; i++) 
        {
            forecastArray.push({
                date: daily.time[i],
                weekday: getWeekday(daily.time[i]),
                tempMax: daily.temperature_2m_max[i],
                tempMin: daily.temperature_2m_min[i],
                weatherCode: codesArray[i],
                windSpeed: daily.wind_speed_10m_max[i]
            });
        }
        initCarouselDOM(forecastArray);
        statusDiv.innerHTML = `Представлены актуальные данные!`;
    } 
    catch (err) 
    {
        statusDiv.innerHTML = `Ошибка доступа к сети: Проверьте интернет. (${err.message})`;
        track.innerHTML = ''; 
        totalCards = 0;
        updateCarousel();
    }
}

function requestGeolocationAndWeather() 
{
    statusDiv.innerHTML = "Определение вашего местоположения...";
    if ("geolocation" in navigator) 
    {
        navigator.geolocation.getCurrentPosition(
            async (position) => 
            {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                await fetchWeather(lat, lon, "Текущее местоположение");
            },
            (error) => 
            {
                statusDiv.innerHTML = "Доступ к геопозиции запрещён. По умолчанию загружается Москва.";
                fetchWeather(55.7558, 37.6176, "Москва");
            },
            {  
                timeout: 5000
            }
        );
    } 
    else 
    {
        statusDiv.innerHTML = "Геолокация не поддерживается браузером. По умолчанию загружается Москва.";
        fetchWeather(55.7558, 37.6176, "Москва");
    }
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
requestGeolocationAndWeather();