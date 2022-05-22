import {useState, useEffect} from 'react';

import {useLog} from '../../hooks/useLog';
import {useUser} from '../../hooks/useUser';
import {usePagination} from '../../hooks/usePagination';

import LogInfo from '../../components/pages/Log/LogInfo';
import Pagination from '../../components/Pagination/Pagination';
// import {CreateTeachingMaterialModal} from '../../components/Modals/Create/CreateLogModal';
import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
// import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
// import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {LoadingWindow} from '../../components/Utilities/Loading';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';
import {ErrorContext} from '../../contexts/ErrorContext';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';

const LogList = () => {
  const {authData} = useContext(AuthContext);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  if (!authData) {
    return <Redirect to='/' />;
  }
  const {logs, getLogs} = useLog();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {users, getUsers} = useUser();
  // const {logPost, setLogPost} = useLogPost();
  // const [modalVisible, setModalVisible] = useState(false);
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
      {/* <AddButtonList>
        <PrimaryButton variant='contained' onClick={() => setModalVisible(true)} sizeX='large' sizeY='small'>
          追加
        </PrimaryButton>
        <PrimaryButton variant='contained' sizeX='large' sizeY='small'>
          複数追加
        </PrimaryButton>
      </AddButtonList> */}
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {logs && (
        <InfoCardList>
          {logs.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <LogInfo data={data} key={data.information_log_id}></LogInfo>
          ))}
        </InfoCardList>
      )}
      <Pagination setOffset={setOffset} dataleng={logs ? logs.length : 0} perPage={perPage}></Pagination>
      {/* {modalVisible && (
        <CreateTeachingMaterialModal
          LogPost={logPost}
          setLogPost={setLogPost}
          onClose={() => setModalVisible(false)}
          Users={users}
          createLogFetch={() => createLog(logPost)}
        ></CreateTeachingMaterialModal>
      )} */}

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default LogList;
