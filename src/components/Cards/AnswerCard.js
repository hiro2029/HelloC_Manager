import styled from 'styled-components';
import {Color} from '../../constants/Color';

const StyledAnswerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  background-color: ${Color['white']};
  border: solid 1px rgb(170, 169, 169);
  box-shadow: 5px 5px 5px #00000040;
  border-radius: 10px;

  @media screen and (min-width: 900px) {
    grid-template-columns: 25vw;
  }
`;

const AnswerCardTop = styled.div`
  padding: 5px 2.5%;
  position: relative;
  font-size: 20px;
  letter-spacing: 1.4px;
  &::after {
    content: '';
    width: 95%;
    height: 3px;
    background-color: ${({color}) => (color ? Color[color] : Color['lightBlue'])};
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
  }
`;

const AnswerCardBottom = styled.div`
  padding: 10px;
  display: grid;
  grid-row-gap: 5px;
`;

const AnswerCardOption = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 10px;
`;

const AnswerCardOptionIndex = styled.span`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 40.1%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240%;
    height: 100%;
    border: 2px solid red;
    border-radius: 50%;
    opacity: ${({correct}) => (correct ? 1 : 0)};
  }
`;

const AnswerCardOptionContent = styled.span``;

export const AnswerCard = (props) => {
  return (
    <StyledAnswerCard>
      <AnswerCardTop>{props.line}行目</AnswerCardTop>
      <AnswerCardBottom>
        {props.options.map((option, index) => {
          return (
            <AnswerCardOption>
              <AnswerCardOptionIndex color={props.color} correct={props.answer === option}>
                {index + 1}
              </AnswerCardOptionIndex>
              <AnswerCardOptionContent>{option}</AnswerCardOptionContent>
            </AnswerCardOption>
          );
        })}
      </AnswerCardBottom>
    </StyledAnswerCard>
  );
};
