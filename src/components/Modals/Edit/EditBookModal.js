import styled from 'styled-components';
import {Modal} from '../Modal';
import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {InputBox} from '../../Forms/InputBox';
import {UserSelectBox} from '../../Forms/SelectBox';
import {TextArea} from '../../Forms/TextArea';
import {ModalTitle} from '../../Utilities/Title';
import {Overray} from '../Overray';

const EditButton = styled(PrimaryButton)`
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

export const EditBookModal = (props) => {
  return (
    <div>
      <Modal>
        {props.users ? (
          <div>
            <ModalTitle color='red'>編集画面</ModalTitle>

            <InputBox
              type='text'
              label='教材名'
              id='groupname'
              value={props.postData.name}
              onChange={(e) => props.onChange({...props.postData, name: e.target.value})}
            />

            <UserSelectBox
              id='username'
              label='作成者'
              value={props.postData.user_id}
              onChange={(e) => props.onChange({...props.postData, user_id: e.target.value})}
              options={props.users}
            />

            <InputBox
              type='text'
              label='アクセスキー'
              id='accesskey'
              value={props.postData.access_key}
              onChange={(e) => props.onChange({...props.postData, access_key: e.target.value})}
            />

            <TextArea
              id='summary'
              value={props.postData.summary}
              rows='5'
              label='教材詳細情報'
              onChange={(e) => props.onChange({...props.postData, summary: e.target.value})}
            />
            <EditButton variant='contained' color='primary' onClick={props.onSave}>
              保存
            </EditButton>
          </div>
        ) : (
          ''
        )}
      </Modal>
      <Overray onClick={props.onClose}></Overray>
    </div>
  );
};
