import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

import {EditUserModal} from '../../components/Modals/Edit/EditUserModal';
import {CreateUserModal, CreateUsersModal} from '../../components/Modals/Create/CreateUserModal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserPagination from '../../components/Pagination/Pagination';
import UserInfo from '../../components/pages/Users/UserInfo';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useUser} from '../../hooks/useUser';
import {usePagination} from '../../hooks/usePagination';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';

const UserTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;

const UserList = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const {users, setUsers, selectUser, setSelectUser, getUsers, createUser, createUsers, updateUser, deleteUser} =
    useUser();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenCreateUsersModal, setIsOpenCreateUsersModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  //ユーザー一括登録用
  const [csv, setCsv] = useState();
  const [submitUsers, setSubmitUsers] = useState();

  const EditUserFetch = () => {
    updateUser(selectUser);
  };

  const CreateUserFetch = () => {
    createUser(selectUser);
  };

  const onCreateUsers = () => {
    if (!csv) {
      alert('ファイルが指定されていません。');
      return;
    }
    if (!csv.name.match(/[^.]+.csv$/)) {
      alert('CSVファイルを指定してください。');
      return;
    }
    if (!confirm('データを追加してもよろしいですか？')) {
      return;
    }
    return Papa.parse(csv, {
      header: true,
      delimiter: ',',
      encoding: 'Shift-JIS',

      complete: (buf) => {
        console.log(buf.data);
        createUsers(
          buf.data
            .map((elem) => {
              if (elem['ユーザ名'] && elem['パスワード'] && elem['メールアドレス'] && elem['権限']) {
                return {
                  password: elem['パスワード'],
                  mail: elem['メールアドレス'],
                  role: elem['権限'],
                  name: elem['ユーザ名'],
                };
              }
            })
            .filter((elem) => elem !== undefined)
        ).then(() => {
          setIsOpenCreateUsersModal(false);
          getUsers();
        });
      },
    });
  };

  const OpenEditModal = (data) => {
    setSelectUser({...data, password: ''});
    setIsOpenEditModal(true);
  };

  const OpenCreateModal = () => {
    setSelectUser({
      name: '',
      mail: '',
      password: '',
      role: '',
    });
    setIsOpenCreateModal(true);
  };

  useEffect(() => {
    console.log('offset:', offset);
    console.log('perPage:', perPage);
  }, [perPage, offset]);

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getUsers().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow></LoadingWindow>
  ) : (
    <div className='UsersBody'>
      {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}

      <PageTitle color='lightGreen'>ユーザ一覧</PageTitle>
      <Breadcrumbs />

      <UserPagination setOffset={setOffset} dataleng={users ? users.length : 0} perPage={perPage}></UserPagination>

      <AddButtonList>
        <PrimaryButton onClick={() => OpenCreateModal()} sizeX='large' sizeY='small'>
          ユーザ作成
        </PrimaryButton>
        <PrimaryButton
          sizeX='large'
          sizeY='small'
          onClick={() => {
            setCsv(undefined);
            setSubmitUsers(undefined);
            setIsOpenCreateUsersModal(true);
          }}
        >
          複数
        </PrimaryButton>
      </AddButtonList>

      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

      <UserTable component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell align='center'>メールアドレス</TableCell>
              <TableCell align='center'>権限</TableCell>
              <TableCell align='center'>変更</TableCell>
              <TableCell align='center'>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users
                .slice(offset, Number(offset) + Number(perPage))
                .map((data) => (
                  <UserInfo
                    data={data}
                    key={data.user_id}
                    onEdit={() => OpenEditModal(data)}
                    deleteUser={deleteUser}
                  ></UserInfo>
                ))}
          </TableBody>
        </Table>
      </UserTable>

      {isOpenEditModal && (
        <EditUserModal
          onClose={() => setIsOpenEditModal(false)}
          editData={selectUser}
          setEdit={setSelectUser}
          EditUserFetch={EditUserFetch}
        ></EditUserModal>
      )}

      {isOpenCreateModal && (
        <CreateUserModal
          onClose={() => setIsOpenCreateModal(false)}
          createData={selectUser}
          setPost={setSelectUser}
          CreateUserFetch={CreateUserFetch}
        ></CreateUserModal>
      )}

      {isOpenCreateUsersModal && (
        <CreateUsersModal
          setCsv={setCsv}
          onCreateUsers={() => onCreateUsers()}
          onClose={() => setIsOpenCreateUsersModal(false)}
        ></CreateUsersModal>
      )}

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default UserList;
