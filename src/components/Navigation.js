import styled from 'styled-components';

import {Anchor} from './Utilities/Anchor';

import {MenuItem, Drawer} from 'material-ui';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';

const UserDataText = styled.div`
  font-size: 16px;
  text-align: center;
`;

const UserDataTexts = styled.div`
  margin-top: 40px;
`;

const Navigation = (props) => {
  const {authData, setAuthData} = useContext(AuthContext);
  return (
    <Drawer docked={false} width={200} open={props.open} onRequestChange={() => props.setOpenNavigation(false)}>
      <Anchor to='/' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>TOP</MenuItem>
      </Anchor>

      {authData ? (
        <div>
          <Anchor to='/group' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>グループ一覧</MenuItem>
          </Anchor>
          <Anchor to='/user' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>ユーザー覧</MenuItem>
          </Anchor>
          <Anchor to='/question' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>問題一覧</MenuItem>
          </Anchor>
          <Anchor to='/book' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>教材一覧</MenuItem>
          </Anchor>
          <Anchor to='/log' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>ログ一覧</MenuItem>
          </Anchor>
          <div style={{marginTop: '40px'}}>
            <Anchor to='/userData' onClick={() => props.setOpenNavigation(false)}>
              <MenuItem>ユーザーページ</MenuItem>
            </Anchor>
            <Anchor
              to='/'
              onClick={() => {
                setAuthData(undefined);
                props.setOpenNavigation(false);
              }}
            >
              <MenuItem>ログアウト</MenuItem>
            </Anchor>
          </div>
        </div>
      ) : (
        <div>
          <Anchor to='/register' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>新規登録</MenuItem>
          </Anchor>
          <Anchor to='/login' onClick={() => props.setOpenNavigation(false)}>
            <MenuItem>ログイン</MenuItem>
          </Anchor>
        </div>
      )}

      {authData && (
        <div>
          <UserDataTexts>
            <UserDataText>{authData.role}でログイン中</UserDataText>
            <UserDataText>{authData.name}</UserDataText>
          </UserDataTexts>
        </div>
      )}
    </Drawer>
  );
};

export default Navigation;
