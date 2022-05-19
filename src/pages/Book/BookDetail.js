import {useEffect, useState} from 'react';

import {Redirect, useParams} from 'react-router';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {Label} from '../../components/Utilities/Card/Label';
import {DetailCard, DetailCardButtons, DetailCardContent, DetailCardSummary} from '../../components/Cards/DetailCard';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';
import {EditBookModal} from '../../components/Modals/Edit/EditBookModal';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useUser} from '../../hooks/useUser';
import {useBookPost, useBook, useBookRecodePost} from '../../hooks/useBook';
import {useQuestion} from '../../hooks/useQuestion';

import {getBook} from '../../components/API/BookAPIs';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {ErrorContext} from '../../contexts/ErrorContext';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';

const BookDetail = () => {
  const {authData} = useContext(AuthContext);
  const param = useParams();

  if (!authData) {
    return <Redirect to='/' />;
  }

  const {bookRecodePost, setBookRecodePost} = useBookRecodePost(param['id']);
  const [loading, setLoading] = useState(true);
  const [Book, setBook] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [questionInBook, setQuestionInBook] = useState([]); //Bookに登録されてる問題
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {users, getUser} = useUser();
  const {questions, setQuestions, getQuestions} = useQuestion();
  const {updateBook, addRecode, removeRecode, getRecodes} = useBook();
  const {bookPost, setBookPost} = useBookPost();

  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  const getQuestionInBook = () => {
    getRecodes(param['id']).then((json) => {
      setQuestionInBook(json);
      console.log(json);
    });
  };

  useEffect(() => {
    getBook(param.id)
      .then(async (json) => {
        if (json.status === 'fail') throw new Error('教材取得失敗');
        setBook(json);
        setBookPost({
          name: json.name,
          summary: json.summary,
          access_key: json.access_key,
          user_id: json.user_id,
        });
        return await getUser(json.user_id).then((json) => {
          if (json.status === 'success') {
            setCreatedBy(json.content.name);
          } else {
            setCreatedBy('取得失敗');
          }
        });
      })
      .then(() => getQuestions())
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    getQuestionInBook();
  }, [Book]);

  const EditBookCheck = () => {
    if (confirm('編集を保存しますか？')) {
      updateBook(param.id, bookPost).then((book) => {
        if (book.status === 'success') {
          setBook(book.content);
          getUser(book.content.user_id).then((json) => {
            if (json.status === 'success') {
              setCreatedBy(json.content.name);
            } else {
              setCreatedBy('取得失敗');
            }
          });
        }
      });
      setIsOpenModal(false);
    }
  };

  return loading ? (
    <LoadingWindow />
  ) : (
    <div>
      <PageTitle color='red'>教材詳細</PageTitle>
      <Breadcrumbs />
      {Book ? (
        <DetailCard>
          <DetailCardContent>
            <div>
              <Label>教材名</Label>
              {Book.name}
            </div>
            <div>
              <Label>作成者</Label>
              {createdBy}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {Book.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {Book.created_at}
            </div>
          </DetailCardContent>
          <DetailCardSummary title='教材詳細情報' text={Book ? Book.summary : ''} />
          <DetailCardButtons>
            <PrimaryButton color='secondary' sizeX='large' sizeY='small' onClick={() => setIsOpenModal(true)}>
              編集
            </PrimaryButton>
          </DetailCardButtons>
        </DetailCard>
      ) : (
        ''
      )}
      <PageSubTitle color='orange'>教材内問題一覧</PageSubTitle>

      <EditRelationButtonList
        onAdd={() => addRecode(bookRecodePost).then((json) => setQuestionInBook(json))}
        onDelete={() => removeRecode(bookRecodePost).then((json) => setQuestionInBook(json))}
        onChange={(e) => {
          setBookRecodePost({
            book_id: param['id'],
            question_id: e.target.value,
          });
        }}
        label='教材名'
      >
        {questions
          ? questions.map((data) => (
              <option value={data.question_id} key={data.question_id}>
                {data.name}
              </option>
            ))
          : ''}
      </EditRelationButtonList>

      {questionInBook ? (
        <InfoCardList>
          {questionInBook.map((data) => {
            return <QuestionInfo data={data.question} key={data.question_id}></QuestionInfo>;
          })}
        </InfoCardList>
      ) : (
        ''
      )}

      {/* Modal*/}
      {isOpenModal ? (
        <EditBookModal
          onChange={setBookPost}
          onSave={EditBookCheck}
          users={users}
          postData={bookPost}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        ''
      )}
      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default BookDetail;
