import {useState, useEffect} from 'react';
import styled from 'styled-components';
import QuestionInfo from '../../components/pages/Questions/QuestionInfo';
import Pagination from '../../components/Pagination/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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


const QuestionTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;


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

      <QuestionTable component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell align='center'>format</TableCell>
                  <TableCell align='center'>user_id</TableCell>
                  <TableCell align='center'>mode</TableCell>
                  <TableCell align='center'>time_limit</TableCell>
                  <TableCell align='center'>number_limit</TableCell>
                  <TableCell align='center'>created_at</TableCell>
                  <TableCell align='center'>変更</TableCell>
                  <TableCell align='center'>削除</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {questions ? (
                  questions.slice(offset, Number(offset) + Number(perPage)).map((data) => (
                    <QuestionInfo
                      data={data}
                      key={data.question_id}
                      setQuestions={setQuestions}
                    ></QuestionInfo>
                  ))) : (
                    ''
                  )}
                </TableBody>
            </Table>
          </QuestionTable>
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default QuestionList;
