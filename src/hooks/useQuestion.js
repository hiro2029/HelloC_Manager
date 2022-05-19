import {useContext} from 'react';
import {getQuestions as getQuestionsAPI, getQuestion as getQuestionAPI} from '../components/API/QuestionAPIs';
import {ErrorContext} from '../contexts/ErrorContext';
import {QuestionContext} from '../contexts/QuestionContext';

export const useQuestion = () => {
  const {questions, setQuestions, selectQuestion, setSelectQuestion} = useContext(QuestionContext);
  const {setError, setIsOpenError} = useContext(ErrorContext);
  const getQuestions = async () => {
    return await getQuestionsAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setQuestions(json.content);
      }
      return json;
    });
  };

  const getQuestion = async (id) => {
    return await getQuestionAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setSelectQuestion(json.content);
      }
      return json;
    });
  };

  return {questions, setQuestions, getQuestions, getQuestion, selectQuestion, setSelectQuestion};
};
