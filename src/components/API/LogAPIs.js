import {LogsAPI} from '../../APILink';
import {
  getLogErrorCatch,
  getLogsErrorCatch,
} from './error/Log';

class LogError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'LogError';
    this.status = response.status;
  }
}

export const getLogs = async () => {
  return await fetch(LogsAPI) //api
    .then((res) => {
      if (!res.ok) {
        throw new LogError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getLogsErrorCatch(-1);
      } else {
        return getLogsErrorCatch(error.status);
      }
    });
};

export const getLog = async (id) => {
  //id指定で1データ取る
  return await fetch(LogsAPI + '/' + id) //api
    .then((res) => {
      if (!res.ok) {
        throw new LogError(res);
      }
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getLogErrorCatch(-1);
      } else {
        return getLogErrorCatch(error.status);
      }
    });
};

// export const checkBookInQuestions = async (id) => {
//   return await fetch(BooksAPI + '/' + id + '/questions').then((res) => {
//     if (res.status === 404) {
//       return false;
//     } else {
//       return true;
//     }
//   });
// };
