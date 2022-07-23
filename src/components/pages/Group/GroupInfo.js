import styled from 'styled-components';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {Delete, Edit} from '@material-ui/icons';
import {Anchor} from '../../Utilities/Anchor';



import Paper from '@material-ui/core/Paper';
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
const GroupInfo = (props) => {
  const onDelete = async (id) => {
    if (confirm('対象を学習終了者としてよろしいですか？')) {
      return await props.deleteUser(id);
    }
  };

  const Delete = async (id, name) => {
    if (confirm('グループ名：' + name + ' 本当に削除しますか？')) {
      props.onDelete(id);
    }
  };

  return (
    <TableRow key={props.data.group_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>
        {props.data.name}
      </TableCell>
      <TableCell align='center'>{props.data.summary}</TableCell>
      <TableCell align='center'>{props.data.access_key}</TableCell>
      <TableCell align='center'>{props.data.created_at}</TableCell>
      <TableCell align='center'>
        
        <Anchor to={'/group/'.concat(props.data.group_id)}>
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

export default GroupInfo;