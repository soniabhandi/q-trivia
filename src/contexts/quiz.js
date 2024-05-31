import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../helper";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswerCount: 0,
  error: null,
};

const reducer = (state, actions) => {
  switch (actions.type) {
    case "SELECT_ANSWER": {
      const correctAnswerCount =
        actions.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        currentAnswer: actions.payload,
        correctAnswerCount,
      };
    }
    case "LOADED_QUESTIONS": {
      // console.log("LOADED_QUESTIONS", state, actions);
      const normalizedQuestions = normalizeQuestions(actions.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "SERVER_ERROR": {
      return {
        ...state,
        error: actions.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
