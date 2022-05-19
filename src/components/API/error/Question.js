export const getQuestionsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '問題一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '問題一覧取得に失敗しました。問題が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '問題一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getQuestionErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '問題取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '問題取得に失敗しました。該当の問題が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '問題取得に失敗しました。定義されていないエラーです。'};
    }
  }
};
