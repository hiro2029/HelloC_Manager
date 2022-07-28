import {useEffect, useState} from 'react';
import {UsersAPI} from '../../../APILink';
import styled from 'styled-components';

import {deleteBlankQuestion, getQuestions} from '../../API/QuestionAPIs';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {Anchor} from '../../Utilities/Anchor';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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

const QuestionInfo = (props) => {
  const onDelete = async (id) => {
    if (confirm('対象を学習終了者としてよろしいですか？')) {
      return await props.deleteUser(id);
    }
  };
  const [User, setUser] = useState();

  useEffect(() => {
    fetch(UsersAPI + '/' + props.data.user_id) //api
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  const deleteQuestion = () => {
    if (!confirm(`問題名：${props.data.name}のデータを削除してもよろしいですか？`)) {
      return;
    }
    if (props.data.format === 'blank_select') {
      deleteBlankQuestion(props.data.question_id).then(() => {
        getQuestions().then((json) => props.setQuestions(json));
      });
    }
  };

  return (
    <TableRow key={props.data.question_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>{props.data.name}</TableCell>
      <TableCell align='center'>{props.data.format}</TableCell>
      <TableCell align='center'>{props.data.user_id}</TableCell>
      <TableCell align='center'>{props.data.mode}</TableCell>
      <TableCell align='center'>{props.data.time_limit}</TableCell>
      <TableCell align='center'>{props.data.number_limit}</TableCell>
      <TableCell align='center'>{props.data.created_at}</TableCell>
      <TableCell align='center'>
        
        <Anchor to={'/question/'.concat(props.data.question_id)}>
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




    // <InfoCard>
    //   <InfoCardDetail>
    //     <div>
    //       <Label>問題名</Label>
    //       {props.data.name}
    //     </div>
    //     <div>
    //       <Label>作成者</Label>
    //       {User ? User.name : ''}
    //     </div>
    //     <div>
    //       <Label>問題形式</Label>
    //       {props.data.mode}
    //     </div>
    //     <div>
    //       <Label>作成日</Label>
    //       {props.data.created_at}
    //     </div>
    //   </InfoCardDetail>
    //   <InfoCardButtons>
    //     <PrimaryButton
    //       color='secondary'
    //       onClick={() => {
    //         deleteQuestion();
    //       }}
    //     >
    //       削除する
    //     </PrimaryButton>
    //     <Anchor to={'/question/'.concat(props.data.question_id)}>
    //       <PrimaryButton>詳細を見る</PrimaryButton>
    //     </Anchor>
    //   </InfoCardButtons>
    // </InfoCard>
  );
};

export default QuestionInfo;
