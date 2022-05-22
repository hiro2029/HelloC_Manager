export const getLogErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ログ取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ログ取得に失敗しました。該当ログが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ログ取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getLogsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};