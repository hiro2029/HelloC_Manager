import {useState, useEffect} from 'react';
import {useLog} from '../../hooks/useLog';
import {useUser} from '../../hooks/useUser';
import {usePagination} from '../../hooks/usePagination';
import LogInfo from '../../components/pages/Log/LogInfo';
import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';
import {LoadingWindow} from '../../components/Utilities/Loading';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '../../components/Pagination/Pagination';
import {ErrorContext} from '../../contexts/ErrorContext';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';

const LogTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;
const LogList = () => {
  const {authData} = useContext(AuthContext);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  if (!authData) {
    return <Redirect to='/' />;
  }
  const {logs, getLogs} = useLog();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {users, getUsers} = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
    setOffset(0);
    setLoading(true);
    getLogs().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div className='Body'>
      <PageTitle color='pink'>ログ一覧</PageTitle>
      <Breadcrumbs />
      <Pagination setOffset={setOffset} dataleng={logs ? logs.length : 0} perPage={perPage}></Pagination>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

      <LogTable component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>log_id</TableCell>
                  <TableCell align='center'>学習者</TableCell>
                  <TableCell align='center'>問題名</TableCell>
                  <TableCell align='center'>問題形式</TableCell>
                  <TableCell align='center'>学習日</TableCell>
                  <TableCell align='center'>詳細</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs &&
                  logs.slice(offset, Number(offset) + Number(perPage))
                  .map((data) => (
                    <LogInfo
                      data={data}
                      key={data.information_log_id}
                    ></LogInfo>
                  ))}
                </TableBody>
            </Table>
          </LogTable>
      <Pagination setOffset={setOffset} dataleng={logs ? logs.length : 0} perPage={perPage}></Pagination>
      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default LogList;
