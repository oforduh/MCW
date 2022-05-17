import React, { useState } from "react";
import styles from "./question.module.scss";

const Question = ({
  quizOption,
  isSubmiited,
  countRightAnswers,
  identifier,
  quizLength,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  // This functionality grab the selected option id
  const grabID = (id) => {
    //  set the selected option as the answer the user selected
    setSelectedOption(id);
    countRightAnswers(id, quizOption.correct_answer, identifier);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  // The list of options of each questions
  let options = quizOption.answers;

  return (
    <div className={styles.questionParent}>
      <div className={styles.questionContentDiv}>
        <div className={styles.questionNumber}>
          <div className={styles.ContentDiv}>
            <span>Question</span>
            <span> {`${identifier + 1}/${quizLength}`}</span>
          </div>
        </div>
        <div className={styles.questionComponent}>
          <h4>{quizOption.question}</h4>
          <div className={styles.optionComponent}>
            {options.map((answer, index) => {
              return (
                <button
                  onClick={() => {
                    grabID(answer);
                  }}
                  className={styles.optionsButton}
                  key={index}
                  style={{
                    background:
                      answer === selectedOption ? "#0092e3" : "#f4f4f4",

                    color:
                      isSubmiited && answer !== quizOption.correct_answer
                        ? "red"
                        : isSubmiited && answer === quizOption.correct_answer
                        ? "green"
                        : answer === selectedOption && "#fff",
                    border:
                      isSubmiited && answer !== quizOption.correct_answer
                        ? "1px solid red"
                        : isSubmiited &&
                          answer === quizOption.correct_answer &&
                          "1px solid green",
                  }}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
