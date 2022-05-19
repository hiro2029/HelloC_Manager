import styled from 'styled-components';
import {Label} from '../Utilities/Card/Label';

const StyledDetailCard = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  max-width: 1800px;
  margin-bottom: 50px;
  background-color: antiquewhite;
  border: solid 1px rgb(170, 169, 169);
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 5px 5px 5px #00000040;
  z-index: 1;
`;

const StyledDetailCardContent = styled.div`
  padding: 0 10px;
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 20px;

  @media screen and (max-width: 790px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const StyledDetailCardSummary = styled.div`
  padding: 0 10px;
  padding-top: 20px;
`;

const SummaryRange = styled.div`
  margin: 10px 10px;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 2;
  margin-bottom: 0;
`;

const StyledDetailCardButtons = styled.div`
  padding: 25px 0px;
  padding-bottom: 0;
  display: grid;
  grid-template-columns: repeat(1, max-content);
  justify-content: space-evenly;

  @media screen and (max-width: 450px) {
    grid-template-columns: max-content;
    grid-row-gap: 10px;
  }
`;

export const DetailCard = (props) => {
  return <StyledDetailCard>{props.children}</StyledDetailCard>;
};

export const DetailCardContent = (props) => {
  return <StyledDetailCardContent>{props.children}</StyledDetailCardContent>;
};

export const DetailCardQuestionView = (props) => {
  return <StyledDetailCardQuestionView>{props.children}</StyledDetailCardQuestionView>;
};

export const DetailCardSummary = (props) => {
  return (
    <StyledDetailCardSummary>
      <div>
        <Label>{props.title}</Label>
      </div>
      {props.text ? (
        <SummaryRange>
          {props.text.split(/(\n)/).map((item) => {
            return item.match(/\n/) ? <br /> : item;
          })}
        </SummaryRange>
      ) : (
        ''
      )}
    </StyledDetailCardSummary>
  );
};

export const DetailCardButtons = (props) => {
  return <StyledDetailCardButtons>{props.children}</StyledDetailCardButtons>;
};
