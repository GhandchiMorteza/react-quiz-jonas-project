import { useQuizContext } from './QuizContext';

function Progress({ numQuestions, maxPossiblePoints }) {
  const { state } = useQuizContext();
  const { index, answer, points } = state;
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}{' '}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
