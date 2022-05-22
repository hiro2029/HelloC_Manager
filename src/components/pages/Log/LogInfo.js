import {useEffect, useState} from 'react';
import {useUser} from '../../../hooks/useUser';
import {useQuestion} from '../../../hooks/useQuestion';
import {Anchor} from '../../Utilities/Anchor';
import {useLog} from '../../../hooks/useLog';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';

/* TM = TeachingMaterial */

const LogInfo = (props) => {
  // const {deleteLog} = useLog();
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
    // getQuestion(props.data.user_id).then((json) => {
    //   if (json.status === 'success') {
    //     setUser(json.content);
    //   } else {
    //     setUser({name: '取得失敗'});
    //   }
    // })
  }, []);
  useEffect(() => {
    getQuestion(props.data.user_id).then((json) => {
      if (json.status === 'success') {
        setQuestion(json.content);
      } else {
        setQuestion({name: '取得失敗'});
      }
    })
  }, []);

  return (
    <InfoCard>
      <InfoCardDetail>
        <div>
          <Label>学習者</Label>
          {user ? user.name : ''}
        </div>
        <div>
          <Label>問題名</Label>
          {question ? question.name : ''}
        </div>
        <div>
          <Label>問題形式</Label>
          {props.data.format}
        </div>
        <div>
          <Label>作成日</Label>
          {props.data.created_at}
        </div>
      </InfoCardDetail>
      <InfoCardButtons>
        {/* <PrimaryButton color='secondary' onClick={() => deleteBook(props.data.book_id, props.data.name)}>
          削除する
        </PrimaryButton> */}
        <Anchor to={'/log/'.concat(props.data.information_log_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </Anchor>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default LogInfo;
