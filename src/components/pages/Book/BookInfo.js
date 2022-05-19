import {useEffect, useState} from 'react';
import {useUser} from '../../../hooks/useUser';
import {Anchor} from '../../Utilities/Anchor';
import {useBook} from '../../../hooks/useBook';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';

/* TM = TeachingMaterial */

const BookInfo = (props) => {
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
    <InfoCard>
      <InfoCardDetail>
        <div>
          <Label>教材名</Label>
          {props.data.name}
        </div>
        <div>
          <Label>作成者</Label>
          {user ? user.name : ''}
        </div>
        <div>
          <Label>アクセスキー</Label>
          {props.data.access_key}
        </div>
        <div>
          <Label>作成日</Label>
          {props.data.created_at}
        </div>
      </InfoCardDetail>
      <InfoCardButtons>
        <PrimaryButton color='secondary' onClick={() => deleteBook(props.data.book_id, props.data.name)}>
          削除する
        </PrimaryButton>
        <Anchor to={'/book/'.concat(props.data.book_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </Anchor>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default BookInfo;
