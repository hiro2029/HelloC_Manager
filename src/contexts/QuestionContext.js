import {useState, createContext} from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = (props) => {
  const [questions, setQuestions] = useState([]);
  const [selectQuestion, setSelectQuestion] = useState();
  return (
    <QuestionContext.Provider
      value={{questions: questions, setQuestions, selectQuestion: selectQuestion, setSelectQuestion}}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
