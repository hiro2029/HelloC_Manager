import styled from 'styled-components';
import {Color} from '../../../constants/Color';

const StyledQuestionBoard = styled.div`
  padding: 15px;
  color: white;
  border: 2px solid 
  border-radius: 20px;
  width: 80%;
  height:500px;
  overflow-y:scroll;
  overflow-x:auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px 0;
  letter-spacing: 1px;
  font-size:18px;

  background: #104300;
  border: 8px solid #a60;
  box-shadow: 2px 2px 4px #999, 2px 2px 2px #020 inset;

  @media screen and (max-width:800px){
    width:95%;
  }
`;

export const QuestionBoard = (props) => {
  return <StyledQuestionBoard>{props.children}</StyledQuestionBoard>;
};
