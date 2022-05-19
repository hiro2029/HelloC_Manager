import {useState, useEffect} from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import {UsersAPI} from '../../../APILink';

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

export const CreateGroupModal = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  const CreateGroupCheck = () => {
    if (
      props.PostData.name == '' ||
      props.PostData.summary == '' ||
      props.PostData.user_id == '' ||
      props.PostData.access_key == ''
    ) {
      alert('全ての項目を入力してください。');
      return;
    }
    if (confirm('データを作成してよろしいですか？')) {
      props.CreateGroupFetch();
      props.onClose();
      // console.log(EditGroupPostData);
    }
  };

  return (
    <div>
      <Modal>
        <ModalTitle className='ModalTitle'>グループ作成</ModalTitle>
        <InputUnit>
          <label htmlFor='groupname'>グループ名</label>
          <input
            type='text'
            id='groupname'
            value={props.PostData.name}
            onChange={(e) => props.setPostData({...props.PostData, name: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='username'>作成者</label>
          <select
            id='username'
            value={props.PostData.user_id}
            onChange={(e) => props.setPostData({...props.PostData, user_id: e.target.value})}
          >
            <option value=''></option>
            {Users.map((data) => (
              <option value={data.user_id} key={data.user_id}>
                {data.name}
              </option>
            ))}
          </select>
        </InputUnit>
        <InputUnit>
          <label htmlFor='accesskey'>アクセスキー</label>
          <input
            type='text'
            id='accesskey'
            value={props.PostData.access_key}
            onChange={(e) => props.setPostData({...props.PostData, access_key: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='summary'>グループ概略</label>
          <textarea
            id='summary'
            value={props.PostData.summary}
            rows='5'
            onChange={(e) => props.setPostData({...props.PostData, summary: e.target.value})}
          ></textarea>
        </InputUnit>
        <CreateGroupButton variant='contained' color='primary' onClick={() => CreateGroupCheck()}>
          作成
        </CreateGroupButton>
      </Modal>
      <Overray onClick={props.onClose}></Overray>
    </div>
  );
};
