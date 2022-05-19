import {useState, useEffect} from 'react';

import {Redirect, useParams} from 'react-router';

import styled from 'styled-components';

import {UsersAPI} from '../../APILink';

import BookInfo from '../../components/pages/Book/BookInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../../components/Cards/DetailCard';
import {Label} from '../../components/Utilities/Card/Label';
import {EditGroupModal} from '../../components/Modals/Edit/EditGroupModal';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useGroup, useGroupPost} from '../../hooks/useGroup';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';
import {useBook} from '../../hooks/useBook';
import {useUser} from '../../hooks/useUser';

const GroupDetailCard = styled(DetailCard)`
  padding-top: 30px;
`;

const GroupDetail = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const param = useParams();

  const [CreatedBy, setCreatedBy] = useState();
  const [BooksInGroup, setBooksInGroup] = useState([]); //Groupに対応したBooksを入れておく
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);
  const {books, setBooks, getBooks} = useBook();
  const {users, getUser, getUsers} = useUser();
  const {selectGroup, setSelectGroup, getGroup, updateGroup, getCollections, addCollection, removeCollection} =
    useGroup();
  const {groupPost, setGroupPost, groupPostInit} = useGroupPost();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [BookPostBody, setBookPostBody] = useState({group_id: param['id'], book_id: ''});

  const registerBook = () => {
    addCollection(BookPostBody).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  };

  const removeBook = () => {
    removeCollection(BookPostBody).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  };

  const BookPostChange = (id) => {
    setBookPostBody({group_id: param['id'], book_id: id});
  };

  const EditGroupCheck = () => {
    if (confirm('編集を保存しますか？')) {
      updateGroup(groupPost).then((json) => {
        if (json.status === 'success') {
          setSelectGroup(json.content);
          groupPostInit(json.content);
        }
      });
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    //最初にGroupデータと関連教材を取得
    getGroup(param['id'])
      .then((json) => {
        if (json.status === 'success') {
          setSelectGroup(json.content);
          groupPostInit(json.content);
        }
      })
      .then(() => {
        getUsers();
      })
      .then(() => {
        getBooks();
      });

    getCollections(param['id']).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof selectGroup !== 'undefined') {
      getUser(selectGroup.user_id).then((json) => {
        setCreatedBy(json.content.name);
      });
    }
  }, [selectGroup]);

  return (
    <div>
      <PageTitle color='blue'>グループ詳細</PageTitle>
      <Breadcrumbs />
      <GroupDetailCard>
        {selectGroup && (
          <DetailCardContent>
            <div>
              <Label>グループ名</Label>
              {selectGroup.name}
            </div>
            <div>
              <Label>作成者</Label>
              {CreatedBy ? CreatedBy : ''}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {selectGroup.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {selectGroup.created_at}
            </div>
          </DetailCardContent>
        )}
        <DetailCardSummary title='グループ概略' text={selectGroup && selectGroup.summary} />
        <DetailCardButtons>
          <PrimaryButton
            color='secondary'
            sizeX='large'
            sizeY='small'
            onClick={() => {
              setIsOpenModal(true);
              setGroupPost(selectGroup);
            }}
          >
            編集
          </PrimaryButton>
        </DetailCardButtons>
      </GroupDetailCard>

      <PageSubTitle>グループ内教材一覧</PageSubTitle>

      <EditRelationButtonList
        onAdd={() => registerBook()}
        onDelete={() => removeBook()}
        onChange={(e) => {
          BookPostChange(e.target.value);
        }}
        label='教材名'
      >
        <option value='' key=''></option>
        {books.map((data) => (
          <option value={data.book_id} key={data.book_id}>
            {data.name}
          </option>
        ))}
      </EditRelationButtonList>

      {BooksInGroup && (
        <InfoCardList>
          {BooksInGroup.map((data) => {
            console.log(data);
            return <BookInfo data={data.book} key={data.book_id}></BookInfo>;
          })}
        </InfoCardList>
      )}

      {isOpenModal && (
        <EditGroupModal
          onChange={setGroupPost}
          onSave={() => EditGroupCheck()}
          postData={groupPost}
          users={users}
          onClose={() => setIsOpenModal(false)}
        />
      )}

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default GroupDetail;
