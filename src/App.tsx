import { useState } from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionsCard';
// types
import { QuestionState, Difficulty } from './API';

import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [difficulty, setDifficulty] = useState('EASY');

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    if (difficulty === 'EASY') {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
    } else if (difficulty === 'MEDIUM') {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.MEDIUM
      );
      setQuestions(newQuestions);
    } else if (difficulty === 'HARD') {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.HARD
      );
      setQuestions(newQuestions);
    }

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const difficultySelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion == TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <label htmlFor="easy">
              EASY
              <input
                id="easy"
                type="radio"
                checked={difficulty === 'EASY'}
                value="EASY"
                onChange={(e) => difficultySelected(e)}
              />
            </label>
            <label htmlFor="medium">
              MEDIUM
              <input
                id="medium"
                type="radio"
                checked={difficulty === 'MEDIUM'}
                value="MEDIUM"
                onChange={(e) => difficultySelected(e)}
              />
            </label>
            <label htmlFor="hard">
              HARD
              <input
                id="hard"
                type="radio"
                checked={difficulty === 'HARD'}
                value="HARD"
                onChange={(e) => difficultySelected(e)}
              />
            </label>

            <button className="start" onClick={startQuiz}>
              Start
            </button>
          </>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions ...</p>}

        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
