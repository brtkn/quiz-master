import React from "react";

const Answer = ({
  answer,
  id,
  isSelected,
  handleAnswerClick,
  isCorrect,
  showResults,
}) => {
  let colorClass = "";

  if (showResults) {
    if (isSelected && isCorrect) {
      colorClass = "bg-green-900"; // Correct answer that was selected
    } else if (isSelected && !isCorrect) {
      colorClass = "bg-red-500"; // Incorrect answer that was selected
    } else if (!isSelected && isCorrect) {
      colorClass = "bg-green-700"; // Correct answer that wasn't selected
    } else {
      colorClass = "bg-slate-500"; // Default background color for other answers
    }
  } else {
    colorClass = isSelected ? "bg-blue-600" : "bg-slate-500"; // Default background color when showResults is false
  }

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const decodedAnswer = decodeHTML(answer);
  return (
    <div
      className={`${colorClass} rounded-2xl text-center  mt-1 p-1 text-yellow-50 font-bold`}
      onClick={handleAnswerClick}
    >
      {decodedAnswer}
    </div>
  );
};

export default Answer;
