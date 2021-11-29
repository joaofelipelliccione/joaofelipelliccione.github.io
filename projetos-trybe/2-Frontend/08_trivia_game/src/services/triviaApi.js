const END_POINT_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getTokenTriviaAPI = async () => {
  const response = await fetch(END_POINT_TOKEN);
  const jsonFormat = await response.json();
  return jsonFormat;
};

export const getQuestionsTriviaAPI = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const jsonFormat = await response.json();
  return jsonFormat;
};
