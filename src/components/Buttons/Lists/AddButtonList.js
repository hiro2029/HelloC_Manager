import styled from 'styled-components';

const StyledAddButtonList = styled.div`
  display: grid;
  margin-bottom: 30px;
  margin-right: 10%;
  grid-template-columns: repeat(2, max-content);
  justify-content: right;
  grid-column-gap: 20px;
`;

export const AddButtonList = (props) => {
  return <StyledAddButtonList>{props.children}</StyledAddButtonList>;
};
