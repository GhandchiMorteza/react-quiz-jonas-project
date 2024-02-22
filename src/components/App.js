import { useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';
import { useQuizContext } from './QuizContext';

export default function App() {
  const { state, dispatch } = useQuizContext();
  console.log(state);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (accumulator, cur) => accumulator + cur.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'error' && <Error />}
        {state.status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === 'active' && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question />

            <Footer>
              <Timer />
              <NextButton numQuestions={numQuestions} />
            </Footer>
          </>
        )}
        {state.status === 'finished' && (
          <FinishScreen maxPossiblePoints={maxPossiblePoints} />
        )}
      </Main>
    </div>
  );
}
