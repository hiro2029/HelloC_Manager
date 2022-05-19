import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
  const handlePageChange = (data) => {
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    console.log('selected:' + page_number);
    props.setOffset(page_number * props.perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };

  return (
    <div>
      <ReactPaginate
        style={{marginTop: 10, marginBottom: 100}}
        pageCount={Math.ceil(props.dataleng / props.perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={5}
        pageRangeDisplayed={10}
        onPageChange={handlePageChange}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel='<'
        nextLabel='>'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        disabledClassName='disabled'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
      />
    </div>
  );
};

export default Pagination;
