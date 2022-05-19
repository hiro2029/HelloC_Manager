export const getUserErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ユーザー取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ユーザー取得に失敗しました。該当ユーザーが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ユーザー取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getUsersErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ユーザー一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ユーザー一覧取得に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ユーザー一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const createUserErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ユーザー作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ユーザー作成に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ユーザー作成に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const editUserErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ユーザー編集に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ユーザー編集に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ユーザー編集に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const deleteUserErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ユーザー削除に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ユーザー削除に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ユーザー削除に失敗しました。定義されていないエラーです。'};
    }
  }
};
