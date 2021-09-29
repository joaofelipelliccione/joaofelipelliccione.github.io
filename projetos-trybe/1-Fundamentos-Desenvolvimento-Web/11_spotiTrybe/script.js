/* Utilizaremos a "server-to-server authentication", o que não é ideal.
Esse tipo de autenticação faz com que as chaves de acesso fiquem explícitas durante cada requisição.*/
const CLIENT_ID = '166de45747534183a240ddf829ead0f9';
const CLIENT_SECRET = '5627899d6f114ad9ab0911a1fda15f28';
const BASE_URL = 'https://api.spotify.com/v1'; // URL base para realizar requisições referente à músicas, artistas, albuns...

let token; // Declarando variável que armazenará o token oriundo da requisição abaixo.

/* REF: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
  Solicitando token de acesso informando CLIENT_ID, CLIENT_SECRET e GRANT_TYPE [Especificação OAuth 2.0].
  A requisição deve ser feita para o endpoint https://accounts.spotify.com/api/token, via POST method.
*/

async function getToken() {
  /* O principal parâmetro necessário para estruturar o Header dessa requisição é: 
    --> Basic <base64 encoded client_id:client_secret>
    OBS: No JavaScript, a encriptação base64 é feita através da função nativa btoa(stringQualquer).
  */
  const idAndSecret = `${CLIENT_ID}:${CLIENT_SECRET}`; // client_id:client_secret
  const headerParameter = `Basic ${btoa(idAndSecret)}`; // Basic base64 encoded(client_id:client_secret)

  // Estruturação do Header da requisição:
  const requestHeader = new Headers(); // Função constructor do JavaScript.
  requestHeader.append('Content-Type', 'application/x-www-form-urlencoded'); // Tendo em vista que tal API utiliza a especificação OAuth 2.0, o tipo do conteúdo do body desse request deve seguir o padrão 'application/x-www-form-urlencoded'.
  requestHeader.append('Authorization', headerParameter); // Aqui, estou passando o principal parâmetro do Header, isso é, Basic base64 encoded(client_id:client_secret).

  // Estruturando a requisição, que deverá ser feita para o endpoint https://accounts.spotify.com/api/token, via POST method.
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials', // grant_type informado pelo próprio Spotify
    headers: requestHeader,
  })

  const jsonFormat = await response.json();
  token = jsonFormat.access_token;
  return token; // Ex: BQDVvlRkU9ivNOCTBOTbem-baNv8dI8VnKvu5z8DC4TmrpKGXfwpp4DIBTALfL13g0Hlc2m_nRHyAHbydfs
}

/* REF: https://developer.spotify.com/console/get-search-item/?q=tania+bowra&type=artist
  Estruturação da função que permite a busca por uma determinada música, no buscador do Spotify ().
*/
async function getTracksArray(trackName) {
  let resultArray; // Declarando variável que armazenará o array de objetos que receberemos ao realizar a requisição para o Spotify.

  // Estruturação do Header da requisição:
  const requestHeader = new Headers(); // Função constructor do JavaScript.
  requestHeader.append('Content-Type', 'application/json'); // Nesse caso, o tipo do conteúdo enviado no body desse request segue o padrão 'application/json'.
  requestHeader.append('Accept', 'application/json'); // Estou pedindo para que a response tenha o padrão 'application/json'.
  requestHeader.append('Authorization', `Bearer ${token}`); // Aqui, estou passando o token que obtive na função getToken().

  // Estruturando a requisição, que deverá ser feita para o endpoint https://api.spotify.com/v1/search, via GET method.
  const response = await fetch(`${BASE_URL}/search?q=${trackName}&type=track&market=BR&limit=20`, {
    method: 'GET',
    headers: requestHeader,
  })

  const jsonFormat = await response.json();
  resultArray = jsonFormat.tracks.items
  return resultArray; // Array com informações referente as 20 primeiras músicas que apareceram ao pesquisar 'trackName'.
}

function createEachTrackElement(tracksArray) { // Função que cria os elementos HTML com as informações recebidas da API do Spotify.
  tracksArray.forEach((track) => {
    const allTracksContainer = document.querySelector('.allTracksContainer');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const pTrackName = document.createElement('p');
    const pArtistName = document.createElement('p');
    const popularidade = document.createElement('p');
    const a = document.createElement('a');

    div.className = 'eachTrack';
    div.id = track.id;

    img.src = track.album.images[2].url;
    img.alt = track.album.name;
    img.className = 'albumImages';
    div.appendChild(img);

    pTrackName.className = 'track'
    pTrackName.innerHTML = track.name;
    div.appendChild(pTrackName);

    pArtistName.innerHTML = `Principal Compositor: ${track.artists[0].name}`;
    div.appendChild(pArtistName);

    popularidade.className = 'popularity';
    popularidade.innerHTML = `Popularidade: ${track.popularity}%`;
    div.appendChild(popularidade);

    a.className = 'listenToTheMusic';
    a.href = track.external_urls.spotify;
    a.target = '_blank'
    a.innerHTML = 'Escutar no meu Spotify';
    div.appendChild(a);

    allTracksContainer.appendChild(div);
  });
}

async function fillTracksContainer(searchedTrack) { // Função que estrutura o HTML, a partir dos elementos criados pela 'createEachTrackElement(tracksArray)'.
  const searchSection = document.getElementById('searchSection');
  const loadingElement = document.createElement('p');
  loadingElement.id = 'loadingElement';
  loadingElement.innerHTML = 'Buscando...'
  searchSection.insertAdjacentElement('afterend', loadingElement);

  const tracksArray = await getTracksArray(searchedTrack);
  createEachTrackElement(tracksArray);
  loadingElement.remove()
}

function browseSongClick() { // Função que permite que o usuário pesquise uma determinada música, clicando no botão ao lado da caixa de pesquisa da página.
  const searchBox = document.getElementById('searchBox');
  const searchBtn = document.getElementById('searchBtn');
  const allTracksContainer = document.querySelector('.allTracksContainer')
  
  searchBtn.addEventListener('click', () => {
    if(searchBox.value !== '') {
      allTracksContainer.innerHTML = ''
      const arrayForm = searchBox.value.split(" ");
      const songName = arrayForm.join('+')
      fillTracksContainer(songName);
    }
  });
}

function browseSongEnter() { // Função que permite que o usuário pesquise uma determinada música, pressionando enter.
  const searchBox = document.getElementById('searchBox');
  const allTracksContainer = document.querySelector('.allTracksContainer')
  
  searchBox.addEventListener('keydown', (event) => {
    if(searchBox.value !== '' && event.key === 'Enter') {
      allTracksContainer.innerHTML = ''
      const arrayForm = searchBox.value.split(" ");
      const songName = arrayForm.join('+')
      fillTracksContainer(songName);
    }
  });
}

function clickLogoToReload() { // Função que realiza um 'refresh' na página, quando o usuário clica no logo.
  const searchBox = document.querySelector('.logo-title');

  searchBox.addEventListener('click', () => {
    window.location.reload(false);
  })
}

window.onload = async () => {
  clickLogoToReload()
  await getToken();
  fillTracksContainer('Imagine');
  browseSongClick();
  browseSongEnter();
}