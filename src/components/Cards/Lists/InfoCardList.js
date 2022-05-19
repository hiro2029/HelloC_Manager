import styled from 'styled-components';

const StyledInfoCardList = styled.div`
  display: grid;
  grid-template-columns: 90vw;
  justify-content: center;
  grid-row-gap: 20px;
  margin: 30px 0;
`;

export const InfoCardList = (props) => {
  return <StyledInfoCardList>{props.children}</StyledInfoCardList>;
};
