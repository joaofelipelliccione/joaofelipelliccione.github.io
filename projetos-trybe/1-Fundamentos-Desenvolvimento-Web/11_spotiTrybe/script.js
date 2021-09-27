// https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow --> Como realizar a requisição para API.
const CLIENT_ID = '166de45747534183a240ddf829ead0f9';
const CLIENT_SECRET = '5627899d6f114ad9ab0911a1fda15f28';
const BASE_URL = 'https://api.spotify.com/v1'

let token;

// API SPOTIFY

async function getToken() {
  const idAndSecret = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const authorizationHeader = `Basic ${btoa(idAndSecret)}`;

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded'); // Tipo do conteúdo do Body da requisição.
  headers.append('Authorization', authorizationHeader);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: headers,
  })

  const data = await response.json();

  token = data.access_token;
}

async function getGenres() {
  const headers = new Headers({
    'Authorization': `Bearer ${token}`
  })

  response = await fetch(`${BASE_URL}/browse/categories?country=BR&locale=pt-BR`, {
    headers
  });

  const data = await response.json();

  renderGenres(data.categories.items)
}


// RENDERS

function renderGenres(genres) {
  const genresCards = document.querySelector('.genres-cards')

  genres.forEach((genre) => {
    const section = document.createElement('section');
    section.className = 'genre';

    const image = document.createElement('img');
    image.src = genre.icons[0].url;

    const paragraph = document.createElement('p');
    paragraph.innerText = genre.name;

    section.appendChild(image);
    section.appendChild(paragraph);

    genresCards.appendChild(section);
  })
}

window.onload = async () => {
  try {
    await getToken();

    getGenres();
  }catch (error) {
    console.log(error)
  }
}