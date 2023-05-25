import { useState, useEffect } from "react";
import CoverPage from "./CoverPage";
import { nanoid } from "nanoid";
import Quiz from "./components/Answer";
import Question from "./components/Question";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [score, setScore] = useState(0);
  const [introPageState, setPageState] = useState(true);

  const apiUrl = "https://opentdb.com/api.php?amount=5&type=multiple";

  async function fetchTrivia(url) {
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    const finalData = data.results.map((item) => {
      return {
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
        correct_answer: item.correct_answer,
        question: item.question,
        category: item.category,
      };
    });

    return setTrivia(finalData);
  }

  // Fisher-Yates shuffle method. It changes the array item indexes.
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const shuffle = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[shuffle]] = [arr[shuffle], arr[i]];
    }
    // to add every answer an id and held attributes
    return arr.map((ans) => {
      return { answer: ans, id: nanoid(), isHeld: false };
    });
  }

  useEffect(() => {
    fetchTrivia(apiUrl);
  }, []);

  function togglePageState() {
    setPageState(!introPageState);
    fetchTrivia();
  }

  function newSetOfQuestions() {
    fetchTrivia(apiUrl);
    setScore(0);
    setPageState(false);
  }

  return (
    <main>
      {introPageState ? (
        <CoverPage togglePageState={togglePageState} />
      ) : (
        <Question
          trivia={trivia}
          score={score}
          setScore={setScore}
          newSetOfQuestions={newSetOfQuestions}
        />
      )}
    </main>
  );
}

export default App;
