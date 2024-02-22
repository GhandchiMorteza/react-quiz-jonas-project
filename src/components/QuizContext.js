import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext(null);

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  sec_rem: null,
};

const SEC = 20;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        sec_rem: state.questions.length * SEC,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'again':
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        sec_rem: state.sec_rem - 1,
      };
    default:
      throw new Error('Invalid action was dispatched! ' + action.type);
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const value = useContext(QuizContext);
  if (value === undefined) {
    throw new Error('You are using QuizContext out of the QuizProvider');
  }
  return value;
}

export { useQuizContext, QuizProvider };
