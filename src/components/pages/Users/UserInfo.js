import styled from 'styled-components';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {Delete, Edit} from '@material-ui/icons';

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

const UserInfo = (props) => {
  const onDelete = async (id) => {
    if (confirm('対象を学習終了者としてよろしいですか？')) {
      return await props.deleteUser(id);
    }
  };
  return (
    <TableRow key={props.data.user_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>
        {props.data.name}
      </TableCell>
      <TableCell align='center'>{props.data.mail}</TableCell>
      <TableCell align='center'>{props.data.role}</TableCell>
      <TableCell align='center'>
        <StyledEdit onClick={() => props.onEdit(props.data)}></StyledEdit>
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

export default UserInfo;
