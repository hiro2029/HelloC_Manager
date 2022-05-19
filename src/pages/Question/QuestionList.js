import {useState, useEffect} from 'react';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';
import Pagination from '../../components/Pagination/Pagination';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {Anchor} from '../../components/Utilities/Anchor';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useQuestion} from '../../hooks/useQuestion';
import {usePagination} from '../../hooks/usePagination';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {Redirect} from 'react-router';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';

const QuestionList = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const [loading, setLoading] = useState(true);
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {questions, setQuestions, getQuestions} = useQuestion();
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getQuestions().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div className='Body'>
      <PageTitle color='orange'>問題一覧</PageTitle>
      <Breadcrumbs />
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton color='primary' sizeX='large' sizeY='small'>
          記述問題作成
        </PrimaryButton>
        <Anchor to='/question/createBlank' color='white'>
          <PrimaryButton color='primary' sizeX='large' sizeY='small'>
            空欄問題作成
          </PrimaryButton>
        </Anchor>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {questions ? (
        <InfoCardList>
          {questions.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <QuestionInfo data={data} key={data.question_id} setQuestions={setQuestions}></QuestionInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default QuestionList;
