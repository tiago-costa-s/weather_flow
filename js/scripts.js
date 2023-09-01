// Variaveis
const apiKey = process.env.local.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Seleção de Elementos
const weatherDataContainer = document.querySelector("#weather-data");
const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const weatherIconElement = document.querySelector("#weather-icon");
const tempMinElement = document.querySelector("#tempMin span");
const tempMaxElement = document.querySelector("#tempMax span");
const thermalSensationElement = document.querySelector("#thermal-sensation span");
const descriptionElement = document.querySelector("#description");
const rainElement = document.querySelector("#rain span");
const humidityElement = document.querySelector("#humidity span");

const windElement = document.querySelector("#wind span");
const cloudElement = document.querySelector("#cloud span");

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// Funções
// acessa os dados da api
const getWeatherData = async (city) => {
    // exibe o loader
    toggleLoader();
    // 1 - constroi o link para consultar na api  
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    // 2 - consulta o link da api utilizando fetch passado a variavel apiWeatherURL como argumento
    const res = await fetch(apiWeatherURL);
    // 4 - converte os dados vindo de res em json
    const data = await res.json();
    // oculta o loader
    toggleLoader();

    return data;
};

// exibe a mensagem de erro
function showErrorMessage() {
    errorMessageContainer.classList.remove("hide");
};

// esconde o conteudo e mensage de erro
function hideContent() {
    errorMessageContainer.classList.add("hide");
    weatherDataContainer.classList.add("hide");
};

// exibe o conteudo e mensage de erro
function showContent() {
    weatherDataContainer.classList.remove("hide");
};
// oculta o loader
function toggleLoader() {
    loader.classList.toggle("hide");
};
// Exibe os dados na tela
const showweatherData = async (city) => {
    hideContent();

    const data = await getWeatherData(city);
    // trantado erro cidade não encontrada
    if (data.cod === "404" || data.cod === "400") {
        showErrorMessage();
        return
    }

    showContent();
    // Cidade
    cityElement.innerText = data.name;

    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    temperatureElement.innerText = `${parseInt(data.main.temp)}`;
    tempMinElement.innerText = `${parseInt(data.main.temp_min)}`;
    tempMaxElement.innerText = `${parseInt(data.main.temp_max)}`;
    thermalSensationElement.innerText = `Senssação termica ${parseInt(data.main.feels_like)}`;
    descriptionElement.innerText = `${data.weather[0].description}`;

    if (data.rain) {
        if (data.rain["1h"]) {
            rainElement.innerText = `${data.rain["1h"]} mm`;
        } else if (data.rain["3h"]) {
            rainElement.innerText = `${data.rain["3h"]} mm`;
        }
    } else {
        rainElement.innerText = "n/a";
    }

    humidityElement.innerText = `${data.main.humidity}`;
    windElement.innerText = `${(data.wind.speed).toFixed(1)}km`;
    cloudElement.innerText = `${data.clouds.all}`;
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showweatherData(city);
});

