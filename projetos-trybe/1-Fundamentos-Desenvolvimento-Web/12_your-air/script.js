const GEO_KEY = '6eb899499539474ab89a6dd0b92c6863';
const GEO_BASE_URL = 'https://ipgeolocation.abstractapi.com/v1/';

const AIR_KEY = '97c6fc82-c83e-44b0-b34f-2940a5c46026';
const AIR_BASE_URL = 'http://api.airvisual.com/v2/';

const poluentes = {
  'p2': {
    nome: 'PM2,5',
    descrição: 'As PM2,5 são um tipo de partículas inaláveis, de diâmetro inferior a 2,5 micrometros(µm).'
  },
  'p1': {
    nome: 'PM10',
    descrição: 'As PM10 são um tipo de partículas inaláveis, de diâmetro inferior a 10 micrómetros (µm).'
  },
  'o3': {
    nome: 'Ozônio(O3)',
    descrição: ''
  },
  'n2': {
    nome: 'Dióxido de nitrogênio(NO2)',
    descrição: 'O NO2 é tóxico para pessoas e animais e a exposição de longa duração provoca danos sérios à saúde.'
  },
  's2': {
    nome: 'Dióxido de enxofre SO2',
    descrição: 'O dióxido de enxofre pode contribuir para o aquecimento do planeta e sua presença na chuva ácida é perigosa para vegetais e animais, além de corroer alguns materiais e afetar monumentos, construções e estátuas.'
  },
  'co': {
    nome: 'Monóxido de carbono(CO)',
    descrição: 'Os sintomas de uma ligeira intoxicação por monóxido de carbono incluem desmaio, sensação de confusão, cefaleia, vertigens e outros similares aos da gripe.'
  },
}

let latUser;
let longUser;

// HELPERS
function createLi(string){
  const li = document.createElement('li');
  li.innerText = string;

  return li;
}

// REQUESTS
async function getUserInfo(){
  const response = await fetch(`${GEO_BASE_URL}?api_key=${GEO_KEY}`);
  const data = await response.json();
  console.log(data);

  latUser = data.latitude;
  longUser = data.longitude;

  renderUserInfo(data);
  getWeatherInfo(data);

  const userPosition = { lat: latUser, lng: longUser };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: userPosition,
    zoom: 13,
  });
  const marker = new google.maps.Marker({
    position: userPosition,
    map,
  });
  marker.setMap(map);
}

async function getWeatherInfo({ latitude, longitude }){
  const response = await fetch(`${AIR_BASE_URL}nearest_city?lat=${latitude}&lon=${longitude}&key=${AIR_KEY}`);
  const data = await response.json();
  console.log(data);

  renderRegionInfo(data);
}

// RENDERS
function renderUserInfo({ city, region, country, continent, timezone: { current_time } }){
  const listUser = document.querySelector('.user');

  listUser.appendChild(createLi(`Cidade: ${city}`));
  listUser.appendChild(createLi(`Estado: ${region}`));
  listUser.appendChild(createLi(`País: ${country}`));
  listUser.appendChild(createLi(`Continente: ${continent}`));
  listUser.appendChild(createLi(`Hora Atual: ${current_time}`));
}

function renderRegionInfo({ data }){
  const region = document.querySelector('.region');

  region.appendChild(createLi(`Cidade: ${data.city}`));
  region.appendChild(createLi(`Estado: ${data.state}`));

  renderPollutionInfo(data);
  renderWeatherInfo(data);
}

function renderPollutionInfo({ current: { pollution: { aqius: IQA, mainus: poluente } } }){
  const pollution = document.querySelector('.pollution');

  pollution.appendChild(createLi(`Índice de Qualidade do Ar (IQA): ${IQA}`));
  pollution.appendChild(createLi(`Principal Poluente: ${poluentes[poluente].nome}`));
  pollution.appendChild(createLi(`Descrição do Poluente: ${poluentes[poluente].descrição}`));
}

function createIcone(climIcone) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  img.src = `./assets/icons/${climIcone}.png`;
  img.className = 'icone';
  section.appendChild(img);

  return section;
}

function renderWeatherInfo({ current: { weather: { tp: temp, pr: pressAtmos, hu: umid, ic: climIcone } } }){
  const weather = document.querySelector('.weather');
  const weatherIcon = document.querySelector('#weather-icon');

  weather.appendChild(createLi(`Temperatura: ${temp} C°`));
  weather.appendChild(createLi(`Pressão atmosférica: ${pressAtmos} hPa`));
  weather.appendChild(createLi(`Umidade: ${umid} %`));
  weatherIcon.appendChild(createIcone(climIcone));
}

window.onload = async () => {
  try {
    await getUserInfo();
  } catch (err) {
    console.log(err);
  }
};