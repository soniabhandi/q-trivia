import React, { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import { Answers } from "./Answers";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  return (
    <>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answers
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={(answerText) => {
              dispatch({ type: "SELECT_ANSWER", payload: answerText });
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Question;
