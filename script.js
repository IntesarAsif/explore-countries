function searchCountry() {
    const countryInput = document.getElementById('countryInput').value;
    const countryApiUrl = `https://restcountries.com/v3.1/name/${countryInput}`;

    fetch(countryApiUrl)
        .then(response => response.json())
        .then(data => {
            displayCountry(data);
            const country = data[0];
            if (country) {
                fetchWeatherData(country.latlng[0], country.latlng[1]);
            }
        })
        .catch(error => console.error('Error:', error));
}


function displayCountry(data) {
    const countryGrid = document.getElementById('countryGrid');
    countryGrid.innerHTML = '';

    data.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('col-md-4', 'mb-4');
        countryCard.innerHTML = `
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top" alt="Flag">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Area:</strong> ${country.area} sq km</p> <br>
                    <button class="btn btn-primary" onclick="showDetails('${country.name.common}', '${country.latlng[0]}', '${country.latlng[1]}')">More Details</button>
                </div>
            </div>
        `;
        countryGrid.appendChild(countryCard);
    });
}


function showDetails(countryName, latitude, longitude) {
    const modal = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    modal.style.display = 'block';

    const countryApiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b129b1dabde7fa81134c60c161446d16`;

    fetch(countryApiUrl)
        .then(response => response.json())
        .then(countryData => {
            fetch(weatherApiUrl)
                .then(response => response.json())
                .then(weatherData => {
                    modalTitle.innerText = countryData[0].name.common;
                    modalContent.innerHTML = `
                        <div class="output">
                            <div class="country_output">
                                <h3>Country Information</h3>
                                <img src="${countryData[0].flags.png}" alt="Flag" style="max-width: 100px; margin-bottom: 10px;">
                                <p>Population: ${countryData[0].population}</p>
                                <p>Capital: ${countryData[0].capital}</p>
                                <p>Area: ${countryData[0].area} sq km</p>Ar 
                                <p>Region: ${countryData[0].region}</p>
                                <p>Subregion: ${countryData[0].subregion}</p>
                            </div>

                            <br><br><br>

                            <div class="weather_output">
                                <h3>Weather Information</h3> <br> <br><br>
                                <p>Temperature: ${weatherData.main.temp}K</p>
                                <p>Humidity: ${weatherData.main.humidity}%</p>
                                <p>Air Pressure: ${weatherData.main.pressure} hPa</p>
                                <p>Wind Direction: ${weatherData.wind.deg}&deg;</p>
                                <p>Cloudy: ${weatherData.clouds.all}%</p>
                                <p>Visibility: ${weatherData.visibility / 1000} km</p>
                                </div>   
                        </div>
                    `;
                })
                .catch(error => console.error('Error fetching weather data:', error));
        })
        .catch(error => console.error('Error fetching country data:', error));
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
}



