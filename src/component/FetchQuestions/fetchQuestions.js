// This funcionality fetches questions from an api
const getQuestions = async () => {
  const baseUrl = `https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple`;
  // This Api fetches the user profile
  // https://opentdb.com/api_config.php This api generate random questions and answer
  const request = await fetch(`${baseUrl}`);
  const response = await request.json();

  let questions = [];

  // functionality that generates random ID
  const generateRandomID = () => {
    return Math.floor(Math.random() * 50);
  };

  const responseData = response.results;

  responseData.forEach((data) => {
    data.id = generateRandomID();

    // create an answers key which involve incorrect and correct answers
    data.answers = shuffle([...data.incorrect_answers, data.correct_answer]);

    // Delete objects keys that are needed
    delete data.category;
    delete data.type;
    delete data.difficulty;
    delete data.incorrect_answers;

    questions = [...questions, data];
  });
  return shuffle(questions);
};

// This functionality shuffles an array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export { getQuestions };
