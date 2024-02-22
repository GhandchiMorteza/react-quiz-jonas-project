import { useEffect } from 'react';
import { useQuizContext } from './QuizContext';

function Timer() {
  const { state, dispatch } = useQuizContext();
  const { sec_rem } = state;
  const min = Math.floor(sec_rem / 60);
  const sec = sec_rem % 60;

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);

    return () => clearInterval(id);
  });

  if (sec_rem > 0) {
    return (
      <div className="timer">
        {min < 10 ? '0' : ''}
        {min}:{sec < 10 ? '0' : ''}
        {sec}
      </div>
    );
  } else {
    dispatch({ type: 'finish' });
  }
}

export default Timer;
