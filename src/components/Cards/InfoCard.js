import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledInfoCard = styled(Card)`
  padding-top: 20px;
  background-color: rgb(232, 251, 255) !important;
`;

const StyledInfoCardDetail = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
`;

const StyledInfoCardButtons = styled.div`
  border-top: solid 0.5px rgb(132, 173, 235);
  padding: 25px 0px;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: space-evenly;

  @media screen and (max-width: 450px) {
    grid-template-columns: max-content;
    grid-row-gap: 10px;
  }
`;

export const InfoCard = (props) => {
  return <StyledInfoCard>{props.children}</StyledInfoCard>;
};

export const InfoCardDetail = (props) => {
  return <StyledInfoCardDetail>{props.children}</StyledInfoCardDetail>;
};

export const InfoCardButtons = (props) => {
  return <StyledInfoCardButtons>{props.children}</StyledInfoCardButtons>;
};
