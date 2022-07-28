import {useEffect, useState} from 'react';
import {useUser} from '../../../hooks/useUser';
import {useQuestion} from '../../../hooks/useQuestion';
import {Anchor} from '../../Utilities/Anchor';
import styled from 'styled-components';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DetailsIcon from '@mui/icons-material/Details';

/* TM = TeachingMaterial */

const StyledDetail = styled(DetailsIcon)`
  color: blue;
  cursor: pointer;
`;

const LogInfo = (props) => {
  const [user, setUser] = useState();
  const [question, setQuestion] =useState();
  const {getUser} = useUser();
  const {getQuestion} = useQuestion();

  useEffect(() => {
    getUser(props.data.user_id).then((json) => {
      if (json.status === 'success') {
        setUser(json.content);
      } else {
        setUser({name: '取得失敗'});
      }
    });
  }, []);
  useEffect(() => {
    getQuestion(props.data.question_id).then((json) => {
      if (json.status === 'success') {
        setQuestion(json.content);
      } else {
        setQuestion({name: '取得失敗'});
      }
    })
  }, []);

  return (


    <TableRow key={props.data.information_log_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>
        {props.data.information_log_id}
      </TableCell>
      <TableCell align='center'>{ user ? user.name : '' }</TableCell>
      <TableCell align='center'>{ question ? question.name : '' }</TableCell>
      <TableCell align='center'>{props.data.format}</TableCell>
      <TableCell align='center'>{props.data.created_at}</TableCell>
      <TableCell align='center'>
        
        <Anchor to={'/log/'.concat(props.data.information_log_id)}>
        <StyledDetail></StyledDetail>
        </Anchor>
      </TableCell>
    </TableRow>
  );
};

export default LogInfo;
