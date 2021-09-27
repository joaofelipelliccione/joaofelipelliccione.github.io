// https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow --> Como realizar a requisição para API.
const CLIENT_ID = '166de45747534183a240ddf829ead0f9';
const CLIENT_SECRET = '5627899d6f114ad9ab0911a1fda15f28';

let token;

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

window.onload = function() {
  getToken();
}