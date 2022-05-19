import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import {Modal} from '../Modal';
import {Overray} from '../Overray';

const InputUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

const CreateGroupButton = styled(Button)`
  margin-right: 20px !important;
  font-size: 18px !important;
  border: solid 2px #777;
  background-color: #ddd;
  padding: 5px 20px !important;
  box-shadow: 5px 5px 5px #00000040;
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalTitle = styled.div`
  text-align: left;
  font-size: 20px;
  padding: 7px 20px;
  padding-left: 15px;
  margin-bottom: 40px;
  background: #f4f4f4; /*背景色*/
  border-left: solid 8px #ff47ac; /*左線*/
  border-bottom: solid 3px #d7d7d7; /*下線*/
`;

export const EditUserModal = (props) => {
  const EditUserCheck = () => {
    console.log(props.editData);
    if (
      props.editData.name === '' ||
      props.editData.mail === '' ||
      props.editData.role === '' ||
      props.editData.password === ''
    ) {
      alert('全ての項目を入力してください。');
      return;
    }
    if (confirm('データを作成してよろしいですか？')) {
      //   console.log(props.editData);
      //   console.log(props.password);
      props.EditUserFetch();
      props.onClose();
    }
  };

  return (
    <div>
      <Modal>
        <ModalTitle className='ModalTitle'>ユーザー編集</ModalTitle>
        <InputUnit>
          <label htmlFor='username'>ユーザー名</label>
          <input
            type='text'
            id='username'
            value={props.editData.name}
            onChange={(e) => props.setEdit({...props.editData, name: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='username'>権限</label>
          <select
            id='username'
            value={props.editData.role}
            onChange={(e) => props.setEdit({...props.editData, role: e.target.value})}
          >
            <option value=''></option>
            <option value='教授者'>教授者</option>
            <option value='学習者'>学習者</option>
            <option value='学習終了者'>学習終了者</option>
            <option value='問題作成者'>問題作成者</option>
          </select>
        </InputUnit>
        <InputUnit>
          <label htmlFor='mailaddress'>メールアドレス</label>
          <input
            type='text'
            id='mailaddress'
            value={props.editData.mail}
            onChange={(e) => props.setEdit({...props.editData, mail: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='password'>パスワード</label>
          <input
            type='password'
            id='password'
            value={props.editData.password}
            onChange={(e) => props.setEdit({...props.editData, password: e.target.value})}
          ></input>
        </InputUnit>
        <CreateGroupButton variant='contained' color='primary' onClick={() => EditUserCheck()}>
          保存
        </CreateGroupButton>
      </Modal>
      <Overray onClick={props.onClose}></Overray>
    </div>
  );
};
