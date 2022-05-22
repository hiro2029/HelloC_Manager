import {useState, useContext} from 'react';

import {
  getLogs as getLogsAPI,
  getLog as getLogAPI,
  // checkLogInQuestions,
} from '../components/API/LogAPIs';

import {LogContext} from '../contexts/LogContext';
import {ErrorContext} from '../contexts/ErrorContext';

export const useLog = () => {
  const {logs, setLogs} = useContext(LogContext);
  const {setError, setIsOpenError} = useContext(ErrorContext);

  const getLogs = async () => {
    return await getLogsAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setLogs(json.content);
      }
      return json;
    });
  };

  const getLog = async (id) => {
    return await getLogAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return json;
    });
  };

  return {logs, setLogs, getLogs, getLog};
};

/* Logの編集・作成用のFormフック */

// export const useLogPost = () => {
//   //必要なら変更
//   const [logPost, setLogPost] = useState({name: '', summary: '', access_key: '', user_id: ''});

//   return {logPost, setLogPost};
// };

// export const useLogRecodePost = (id) => {
//   const [logRecodePost, setLogRecodePost] = useState({log_id: id, question_id: 1});

//   return {logRecodePost, setLogRecodePost};
// };
