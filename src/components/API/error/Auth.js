export const loginErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 404: {
      return {status: 'fail', content: 'ログインに失敗しました。入力されたユーザー情報が見つかりません。'};
    }
    case 401: {
      return {status: 'fail', content: 'ログインに失敗しました。パスワードが違います。'};
    }
    default: {
      return {status: 'fail', content: 'ログインに失敗しました。定義されていないエラーです。'};
    }
  }
};

export const registerErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }

    case 400: {
      return {
        status: 'fail',
        content: '新規登録に失敗しました。すでにメールアドレスが登録されている可能性があります。',
      };
    }

    case 404: {
      return {
        status: 'fail',
        content:
          '新規登録に失敗しました。APIが見つからないか、定義されていない権限情報を入力している可能性があります。',
      };
    }
    default: {
      return {status: 'fail', content: '新規登録に失敗しました。定義されていないエラーです。'};
    }
  }
};
