import {useEffect, useState} from 'react';
import {UsersAPI} from '../../../APILink';

import {deleteBlankQuestion, getQuestions} from '../../API/QuestionAPIs';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';
import {Anchor} from '../../Utilities/Anchor';

const QuestionInfo = (props) => {
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
    <InfoCard>
      <InfoCardDetail>
        <div>
          <Label>問題名</Label>
          {props.data.name}
        </div>
        <div>
          <Label>作成者</Label>
          {User ? User.name : ''}
        </div>
        <div>
          <Label>問題形式</Label>
          {props.data.mode}
        </div>
        <div>
          <Label>作成日</Label>
          {props.data.created_at}
        </div>
      </InfoCardDetail>
      <InfoCardButtons>
        <PrimaryButton
          color='secondary'
          onClick={() => {
            deleteQuestion();
          }}
        >
          削除する
        </PrimaryButton>
        <Anchor to={'/question/'.concat(props.data.question_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </Anchor>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default QuestionInfo;
