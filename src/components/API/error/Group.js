export const getGroupsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス一覧取得に失敗しました。APIサーバーのエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス取得に失敗しました。該当グループが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const createGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'Group作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'Group作成に失敗しました。作成用のエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'Group作成に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const updateGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス更新に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス更新に失敗しました。該当のクラスが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス更新に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const deleteGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {
        status: 'fail',
        content:
          'クラス更新に失敗しました。API側でエラーが発生しました。クラス内教材が登録されている場合、削除が行えません。',
      };
    }
    case 404: {
      return {status: 'fail', content: 'クラス更新に失敗しました。該当のクラスが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス更新に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getCollectionsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス内教材一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'not-found', content: []};
    }
    default: {
      return {status: 'fail', content: 'クラス内教材一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const addCollectionErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス内教材作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス内教材作成に失敗しました。該当の教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス内教材作成に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const removeCollectionErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス内教材削除に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {
        status: 'fail',
        content: 'クラス内教材削除に失敗しました。この教材はすでに該当クラスから削除されています。',
      };
    }
    default: {
      return {status: 'fail', content: 'クラス内教材削除に失敗しました。定義されていないエラーです。'};
    }
  }
};
