import styled from 'styled-components';

const SelectPerPageUnit = styled.div`
  display: grid;
  margin-left: 15px;
  grid-template-columns: max-content max-content;
  align-items: baseline;
  grid-column-gap: 15px;
`;

const SelectPerPageLabel = styled.label`
  font-size: 20px;
`;
const SelectPerPageOption = styled.select`
  font-size: 20px;
`;

export const SelectPerPage = (props) => {
  return (
    <SelectPerPageUnit>
      <SelectPerPageLabel>表示数:</SelectPerPageLabel>
      <SelectPerPageOption value={props.perPage} onChange={(e) => props.setPerPage(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </SelectPerPageOption>
    </SelectPerPageUnit>
  );
};
