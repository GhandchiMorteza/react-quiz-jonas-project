import Options from './Options';
import { useQuizContext } from './QuizContext';

function Question() {
  const { state, dispatch } = useQuizContext();
  const { answer, questions, index } = state;
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
