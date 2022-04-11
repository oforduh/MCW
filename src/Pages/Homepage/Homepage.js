import React, { useEffect, useState } from "react";
import { getQuestions } from "../../component/FetchQuestions/fetchQuestions";
import Question from "../../component/Question/Question";
import styles from "./homepage.module.scss";

const Homepage = () => {
  const [quiz, setQuiz] = useState([]);
  const [isSubmiited, setIsSubmitted] = useState(false);
  const [countScore, setCountScore] = useState(0);
  const [counted, setCounted] = useState([]);

  // using use effect and a recursion function to fetch the question and save it to a state
  useEffect(() => {
    (async () => {
      const quiz = await getQuestions();
      setQuiz(quiz);
    })();
  }, []);

  //A function that count scores
  // identifier is the question id
  const countRightAnswers = (selectedAnswer, correctAnswer, identifier) => {
    console.log(selectedAnswer, correctAnswer);
    // if selected answer is correct
    if (selectedAnswer === correctAnswer) {
      if (counted.includes(identifier)) return;
      setCountScore(countScore + 1);
      setCounted([...counted, identifier]);
      return;
    }

    // if selected answer is wrong remove the question index
    if (counted.includes(identifier)) {
      const index = counted.indexOf(identifier);
      setCounted([...counted.splice(0, index), ...counted.splice(index + 1)]);
      setCountScore(countScore - 1);
    }
  };

  console.log(countScore, "yes");
  console.log(counted);

  return (
    <div className={styles.homepageParent}>
      <div className={styles.quizHeader}>
        <h2> Trivial Questions</h2>
      </div>
      <div className={styles.quizComponentDiv}>
        {quiz.map((quiz, index) => (
          <Question
            key={index}
            identifier={index}
            quizOption={quiz}
            isSubmiited={isSubmiited}
            countRightAnswers={countRightAnswers}
          />
        ))}
        <div className={styles.footerParentDiv}>
          {
            //The submit button show up when the
            //quiz array has finished loading
          }
          {quiz.length > 0 && (
            <div className={styles.quizFooter}>
              <button
                className={styles.myButton}
                onClick={() => {
                  setIsSubmitted(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
