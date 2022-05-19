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

const CreateTMButton = styled(Button)`
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

export const CreateTeachingMaterialModal = (props) => {
  const createBookCheck = () => {
    if (
      props.BookPost.name == '' ||
      props.BookPost.summary == '' ||
      props.BookPost.access_key == '' ||
      props.user_id == ''
    ) {
      alert('全ての項目を入力してください。');
      return;
    }
    if (confirm('データを作成してよろしいですか？')) {
      props.createBookFetch();
      props.onClose();
    }
  };

  return (
    <div>
      <Modal>
        <ModalTitle className='ModalTitle'>教材作成</ModalTitle>
        <InputUnit>
          <label htmlFor='username'>教材名</label>
          <input
            type='text'
            id='username'
            value={props.BookPost.name}
            onChange={(e) => props.setBookPost({...props.BookPost, name: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='summary'>概要</label>
          <textarea
            id='summary'
            value={props.BookPost.summary}
            onChange={(e) => props.setBookPost({...props.BookPost, summary: e.target.value})}
          ></textarea>
        </InputUnit>
        <InputUnit>
          <label htmlFor='access_key'>アクセスキー</label>
          <input
            type='text'
            id='access_key'
            value={props.BookPost.access_key}
            onChange={(e) => props.setBookPost({...props.BookPost, access_key: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='username'>作成者</label>
          <select
            id='username'
            value={props.BookPost.user_id}
            onChange={(e) => props.setBookPost({...props.BookPost, user_id: e.target.value})}
          >
            <option value='' key='' selected></option>
            {props.Users
              ? props.Users.map((data) => (
                  <option value={data.user_id} key={data.user_id}>
                    {data.name}
                  </option>
                ))
              : ''}
          </select>
        </InputUnit>
        <CreateTMButton variant='contained' color='primary' onClick={() => createBookCheck()}>
          作成
        </CreateTMButton>
      </Modal>
      <Overray onClick={props.onClose}></Overray>
    </div>
  );
};
