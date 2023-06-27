import { useState, useEffect } from "react";
import Answer from "./Answer";

export default function Question({
  trivia,
  score,
  setScore,
  newSetOfQuestions,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswers] = useState(0);

  useEffect(() => {
    setSelectedAnswers({});
    setShowResults(false);
    setCorrectAnswers(0);
  }, [trivia]);

  const handleAnswerClick = (questionId, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = { ...prevSelectedAnswers };
      updatedSelectedAnswers[questionId] = answerId;
      return updatedSelectedAnswers;
    });
  };

  const isAnswerSelected = (questionId, answerId) => {
    return selectedAnswers[questionId] === answerId;
  };

  const checkAnswers = () => {
    let correctAnswersCount = 0;

    trivia.forEach((item) => {
      const selectedAnswer = selectedAnswers[item.question];

      const correctAnswer = item.correct_answer;

      if (selectedAnswer === correctAnswer) {
        correctAnswersCount++;
        setScore((prevScore) => prevScore + 1);
      }
    });

    setCorrectAnswers(correctAnswersCount);
    setShowResults(true);
  };

  // to get rid of &#039;  etc
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="h-screen  mt-8">
      <h2 className="text-white font-bold text-center text-2xl">
        Click the "Check Answers" button to see the result.
        {showResults && (
          <div className="text-3xl text-center p-2">
            Correct Answers: {correctAnswersCount}/{trivia.length}
          </div>
        )}
      </h2>
      {trivia.map((item) => {
        const decodedQuestion = decodeHTML(item.question);
        return (
          <div className="question-container  p-4" key={item.question}>
            <div className="question text-xl font-bold mb-1">
              {decodedQuestion}
            </div>
            <div className="answer grid grid-cols-2 gap-1">
              {item.answers.map((ans) => {
                return (
                  <Answer
                    key={ans.id}
                    answer={ans.answer}
                    id={ans.answer}
                    isSelected={isAnswerSelected(item.question, ans.answer)}
                    handleAnswerClick={() =>
                      handleAnswerClick(item.question, ans.answer)
                    }
                    isCorrect={ans.answer === item.correct_answer}
                    showResults={showResults}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols">
        <button
          className="bg-blue-500 border-solid border-2 border-green-500 p-4 text-cyan-50 font-extrabold active:bg-slate-500 m-5 focus:outline-none hover:shadow-xl rounded-xl block mx-auto"
          onClick={checkAnswers}
        >
          Check Answers{" "}
          {showResults && (
            <span>
              {correctAnswersCount}/{trivia.length}
            </span>
          )}
        </button>
        <button
          className="bg-blue-700 border-solid border-2 border-green-500 p-4 text-cyan-50 font-extrabold active:bg-slate-500 m-5 focus:outline-none hover:shadow-xl rounded-xl block mx-auto"
          onClick={newSetOfQuestions}
        >
          New Questions
        </button>
      </div>

      {showResults && (
        <div className="text-2xl text-center p-3">
          Correct Answers: {correctAnswersCount}/{trivia.length}
        </div>
      )}
    </div>
  );
}
