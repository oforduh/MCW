import React, { useState } from "react";
import styles from "./question.module.scss";

const Question = ({
  quizOption,
  isSubmiited,
  countRightAnswers,
  identifier,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  // This functionality grab the selected option id
  const grabID = (id) => {
    //  set the selected option as the answer the user selected
    setSelectedOption(id);
    countRightAnswers(id, quizOption.correct_answer, identifier);
  };
  // a function that triggers when the user clicks the submit button

  // The list of options of each questions
  let options = quizOption.answers;
  return (
    <div className={styles.questionParent}>
      <div className={styles.questionComponent}>
        <h3>{quizOption.question}</h3>
        <div className={styles.optionComponent}>
          {
            //map through the options of each questions and create each buttons for them
          }
          {options.map((answer, index) => {
            return (
              <button
                onClick={() => {
                  grabID(answer);
                }}
                className={styles.optionsButton}
                key={index}
                // Writing inline css inside jsx
                // a
                // conditional
                // statement
                // which
                // set
                // a
                // background
                // color
                // when
                // a
                // user
                // selects
                // the
                // button
                style={{
                  background: answer === selectedOption ? "#0092e3" : "#f4f4f4",

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
  );
};

export default Question;
