import {useEffect, useState} from 'react';
import {useUser} from '../../../hooks/useUser';
import {Anchor} from '../../Utilities/Anchor';
import {useBook} from '../../../hooks/useBook';
import styled from 'styled-components';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';
import {Delete, Edit} from '@material-ui/icons';
/* TM = TeachingMaterial */
const StyledDelete = styled(Delete)`
  color: red;
  cursor: pointer;
`;
const DisableDelete = styled(Delete)`
  color: #444;
`;

const StyledEdit = styled(Edit)`
  color: green;
  cursor: pointer;
`;
const BookInfo = (props) => {
  const onDelete = async (id) => {
    if (confirm('対象を学習終了者としてよろしいですか？')) {
      return await props.deleteUser(id);
    }
  };
  const {deleteBook} = useBook();
  const [user, setUser] = useState();
  const {getUser} = useUser();

  useEffect(() => {
    getUser(props.data.user_id).then((json) => {
      if (json.status === 'success') {
        setUser(json.content);
      } else {
        setUser({name: '取得失敗'});
      }
    });
  }, []);

  return (
    // <InfoCard>
    //   <InfoCardDetail>
    //     <div>
    //       <Label>教材名</Label>
    //       {props.data.name}
    //     </div>
    //     <div>
    //       <Label>作成者</Label>
    //       {user ? user.name : ''}
    //     </div>
    //     <div>
    //       <Label>アクセスキー</Label>
    //       {props.data.access_key}
    //     </div>
    //     <div>
    //       <Label>作成日</Label>
    //       {props.data.created_at}
    //     </div>
    //   </InfoCardDetail>
    //   <InfoCardButtons>
    //     <PrimaryButton color='secondary' onClick={() => deleteBook(props.data.book_id, props.data.name)}>
    //       削除する
    //     </PrimaryButton>
    //     <Anchor to={'/book/'.concat(props.data.book_id)}>
    //       <PrimaryButton>詳細を見る</PrimaryButton>
    //     </Anchor>
    //   </InfoCardButtons>
    // </InfoCard>
    <TableRow key={props.data.book_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>
        {props.data.name}
      </TableCell>
      <TableCell align='center'>{props.data.summary}</TableCell>
      <TableCell align='center'>{props.data.access_key}</TableCell>
      <TableCell align='center'>{props.data.user_id}</TableCell>
      <TableCell align='center'>{props.data.created_at}</TableCell>
      <TableCell align='center'>
        
        <Anchor to={'/book/'.concat(props.data.book_id)}>
        <StyledEdit></StyledEdit>
        </Anchor>
      </TableCell>
      <TableCell align='center'>
        {props.data.role !== '学習終了者' ? (
          <StyledDelete onClick={() => onDelete(props.data.user_id)}></StyledDelete>
        ) : (
          <DisableDelete></DisableDelete>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BookInfo;
