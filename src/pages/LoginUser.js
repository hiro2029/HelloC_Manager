import {useEffect} from 'react';
import {useContext} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../components/Cards/DetailCard';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {AuthContext} from '../contexts/AuthContext';
import {PageTitle} from '../components/Utilities/Title';
import {Label} from '../components/Utilities/Card/Label';
import {useState} from 'react';
import {PrimaryButton} from '../components/Buttons/PrimaryButton';
import {useUser} from '../hooks/useUser';

const CardContentUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  @media screen and (max-width: 790px) {
    grid-template-columns: max-content 1fr;
  }
`;

const ButtonContent = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-evenly;
`;

const LoginUser = () => {
  const {authData, setAuthData} = useContext(AuthContext);
  const {selectUser, setSelectUser, updateUser} = useUser();

  const [onEdit, setOnEdit] = useState(false);

  const onSave = () => {
    if (selectUser.name == '' || selectUser.mail == '' || selectUser.role == '' || selectUser.password == '') {
      alert('全ての項目を入力してください。');
      return;
    }

    console.log(selectUser);
    console.log(authData);

    if (confirm('ユーザデータを修正してもよろしいですか？')) {
      updateUser(selectUser).then(() => {
        setAuthData({...authData, mail: selectUser.mail, name: selectUser.name, role: selectUser.role});
      });
      setOnEdit(false);
    }
  };

  const onClose = () => {
    setOnEdit(false);
  };

  if (!authData) {
    return <Redirect to='/' />;
  }

  useEffect(() => {
    console.log(authData);
  });

  return (
    <div>
      <PageTitle>ユーザーページ</PageTitle>
      <Breadcrumbs />
      <DetailCard>
        {onEdit ? (
          <DetailCardContent>
            <CardContentUnit>
              <Label>ユーザー名</Label>
              <input
                id='ユーザー名'
                value={selectUser.name}
                onChange={(e) => {
                  setSelectUser({...selectUser, name: e.target.value});
                }}
              />
            </CardContentUnit>
            <CardContentUnit>
              <Label>メールアドレス</Label>
              <input
                id='メールアドレス'
                value={selectUser.mail}
                onChange={(e) => {
                  setSelectUser({...selectUser, mail: e.target.value});
                }}
              />
            </CardContentUnit>
            <CardContentUnit>
              <Label>権限</Label>
              <select
                id='username'
                value={selectUser.role}
                onChange={(e) => setSelectUser({...selectUser, role: e.target.value})}
              >
                <option value=''></option>
                <option value='教授者'>教授者</option>
                <option value='学習者'>学習者</option>
                <option value='学習終了者'>学習終了者</option>
                <option value='問題作成者'>問題作成者</option>
              </select>
            </CardContentUnit>
            <CardContentUnit>
              <Label>パスワード</Label>
              <input
                id='パスワード'
                value={selectUser.password}
                onChange={(e) => {
                  setSelectUser({...selectUser, password: e.target.value});
                }}
              />
            </CardContentUnit>
          </DetailCardContent>
        ) : (
          <DetailCardContent>
            <CardContentUnit>
              <Label>ユーザーID</Label>
              {authData.user_id}
            </CardContentUnit>
            <CardContentUnit>
              <Label>ユーザー名</Label>
              {authData.name}
            </CardContentUnit>
            <CardContentUnit>
              <Label>メールアドレス</Label>
              {authData.mail}
            </CardContentUnit>
            <CardContentUnit>
              <Label>権限</Label>
              {authData.role}
            </CardContentUnit>
          </DetailCardContent>
        )}
        {onEdit ? (
          <ButtonContent>
            <PrimaryButton
              color='secondary'
              sizeX='large'
              sizeY='small'
              onClick={() => {
                onClose();
              }}
            >
              保存しない
            </PrimaryButton>
            <PrimaryButton
              color='primary'
              sizeX='large'
              sizeY='small'
              onClick={() => {
                onSave();
              }}
            >
              保存
            </PrimaryButton>
          </ButtonContent>
        ) : (
          <ButtonContent>
            <PrimaryButton
              color='secondary'
              sizeX='large'
              sizeY='small'
              onClick={() => {
                setSelectUser({
                  user_id: authData.user_id,
                  mail: authData.mail,
                  name: authData.name,
                  role: authData.role,
                  password: '',
                });
                setOnEdit(true);
              }}
            >
              編集する
            </PrimaryButton>
          </ButtonContent>
        )}
      </DetailCard>
    </div>
  );
};

export default LoginUser;
