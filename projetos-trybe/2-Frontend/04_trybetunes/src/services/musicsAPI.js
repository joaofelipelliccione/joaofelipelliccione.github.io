const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, { mode: 'cors', method: 'post', headers: { 'access-control-allow-origin': 'http://localhost:3000' } });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
