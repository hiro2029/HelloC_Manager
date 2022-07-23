import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useGroup, useGroupPost} from '../../hooks/useGroup';
import {usePagination} from '../../hooks/usePagination';

import GroupInfo from '../../components/pages/Group/GroupInfo';
import Pagination from '../../components/Pagination/Pagination';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CreateGroupModal} from '../../components/Modals/Create/CreateGroupModal';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';

import {LoadingWindow} from '../../components/Utilities/Loading';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';
import {ErrorContext} from '../../contexts/ErrorContext';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
const GroupTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;
const GroupList = () => {
  const {groups, setGroups, getGroups, createGroup, deleteGroup} = useGroup();
  const {groupPost, setGroupPost, groupPostInit} = useGroupPost();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {authData} = useContext(AuthContext);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  // const OpenEditModal = (data) => {
  //   setSelectUser({...data, password: ''});
  //   setIsOpenEditModal(true);
  // };

  if (!authData) {
    return <Redirect to='/' />;
  }

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getGroups().then(() => {
      setLoading(false);
    });
  }, []);

  const openCreateModal = () => {
    groupPostInit();
    setModalVisible(true);
  };

  return (
    <div className='Body'>
      {loading ? (
        <LoadingWindow></LoadingWindow>
      ) : (
        <div>
          <PageTitle color='lightBlue'>グループ一覧</PageTitle>
          <Breadcrumbs />
          {groups ? <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination> : ''}
          <AddButtonList>
            <PrimaryButton sizeX='large' sizeY='small' onClick={() => openCreateModal()}>
              グループ追加
            </PrimaryButton>
          </AddButtonList>
          <SelectPerPage perPage={perPage} setPerPage={setPerPage} />


          <GroupTable component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell align='center'>sumamry</TableCell>
                  <TableCell align='center'>access_key</TableCell>
                  <TableCell align='center'>created_at</TableCell>
                  <TableCell align='center'>変更</TableCell>
                  <TableCell align='center'>削除</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups &&
                  groups
                    .slice(offset, Number(offset) + Number(perPage))
                    .map((data) => (
                      <GroupInfo
                        data={data}
                        key={data.user_id}
                        setGroups={setGroups}
                        // onEdit={() => OpenEditModal(data)}
                        onDelete={deleteGroup}
                      ></GroupInfo>
                    ))}
              </TableBody>
            </Table>
          </GroupTable>

          {/* {groups && (
            <InfoCardList>
              {groups.slice(offset, Number(offset) + Number(perPage)).map((data) => (
                <GroupInfo data={data} key={data.group_id} setGroups={setGroups} onDelete={deleteGroup}></GroupInfo>
              ))}
            </InfoCardList>
          )} */}
          {groups && <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination>}
          {modalVisible && (
            <CreateGroupModal
              onClose={() => setModalVisible(false)}
              PostData={groupPost}
              setPostData={setGroupPost}
              CreateGroupFetch={() => createGroup(groupPost)}
            ></CreateGroupModal>
          )}
        </div>
      )}

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default GroupList;
