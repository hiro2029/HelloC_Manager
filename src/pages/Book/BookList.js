import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useBook, useBookPost} from '../../hooks/useBook';
import {useUser} from '../../hooks/useUser';
import {usePagination} from '../../hooks/usePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BookInfo from '../../components/pages/Book/BookInfo';
import Pagination from '../../components/Pagination/Pagination';
import {CreateTeachingMaterialModal} from '../../components/Modals/Create/CreateBookModal';
import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {LoadingWindow} from '../../components/Utilities/Loading';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';
import {ErrorContext} from '../../contexts/ErrorContext';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import { deleteBook } from '../../components/API/BookAPIs';

const BookTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;

const BookList = () => {
  const {books, setBooks, getBooks, createBook, deleteBook} = useBook();
  const {authData} = useContext(AuthContext);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  if (!authData) {
    return <Redirect to='/' />;
  }
  // const {books, createBook, getBooks} = useBook();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {users, getUsers} = useUser();
  const {bookPost, setBookPost} = useBookPost();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
    setOffset(0);
    setLoading(true);
    getBooks().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div className='Body'>
      <PageTitle color='pink'>教材一覧</PageTitle>
      <Breadcrumbs />
      <Pagination setOffset={setOffset} dataleng={books ? books.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton variant='contained' onClick={() => setModalVisible(true)} sizeX='large' sizeY='small'>
          追加
        </PrimaryButton>
        <PrimaryButton variant='contained' sizeX='large' sizeY='small'>
          複数追加
        </PrimaryButton>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      
      <BookTable component={Paper}>
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
                {books &&
                  books.slice(offset, Number(offset) + Number(perPage))
                  .map((data) => (
                    <BookInfo
                      data={data}
                      key={data.book_id}
                      setBooks={setBooks}
                      // onEdit={() => OpenEditModal(data)}
                      onDelete={deleteBook}
                    ></BookInfo>
                  ))}
                </TableBody>
            </Table>
          </BookTable>
      <Pagination setOffset={setOffset} dataleng={books ? books.length : 0} perPage={perPage}></Pagination>
      {modalVisible && (
        <CreateTeachingMaterialModal
          BookPost={bookPost}
          setBookPost={setBookPost}
          onClose={() => setModalVisible(false)}
          Users={users}
          createBookFetch={() => createBook(bookPost)}
        ></CreateTeachingMaterialModal>
      )}
    

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default BookList;
