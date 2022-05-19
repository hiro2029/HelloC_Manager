export const getBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材取得に失敗しました。該当教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getBooksErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const createBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材作成に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材作成に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const deleteBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材削除に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材削除に失敗しました。該当教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材削除に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const updateBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材更新に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材更新に失敗しました。該当教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材更新に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getRecodesErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材内問題一覧の取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'not-found', content: []};
    }
    default: {
      return {status: 'fail', content: '教材内問題一覧の取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const addRecodeErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材内問題の追加に失敗しました。登録済みの問題です。'};
    }
    case 404: {
      return {status: 'fail', content: '教材内問題の追加に失敗しました。指定した問題が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材内問題の追加に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const removeRecodeErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材内問題の削除に失敗しました。この問題はすでに教材から削除されています。'};
    }
    case 404: {
      return {status: 'fail', content: '教材内問題の削除に失敗しました。指定した問題が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材内問題の削除に失敗しました。定義されていないエラーです。'};
    }
  }
};
