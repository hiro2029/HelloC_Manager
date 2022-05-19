import styled from 'styled-components';
import {Color} from '../../constants/Color';

const StyledTitle = styled.span`
  text-align: left;
  font-size: 30px;
  padding: 10px 30px;
  padding-left: 15px;
  background: ${Color['lightGrey']}; /*背景色*/
  border-left: solid 8px ${(props) => Color[props.color]}; /*左線*/
  border-bottom: solid 3px ${Color['grey']}; /*下線*/
`;

const PageTitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PageSubTitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
`;

const StyledSubTitle = styled.span`
  text-align: left;
  font-size: 20px;
  padding: 7px 20px;
  padding-left: 15px;
  background: ${Color['lightGrey']}; /*背景色*/
  border-left: solid 8px ${(props) => Color[props.color]}; /*左線*/
  border-bottom: solid 3px #d7d7d7; /*下線*/
`;

const StyledModalTitle = styled.div`
  text-align: left;
  font-size: 20px;
  padding: 7px 20px;
  padding-left: 15px;
  margin-bottom: 40px;
  background: ${Color['lightGrey']}; /*背景色*/
  border-left: solid 8px ${(props) => Color[props.color]}; /*左線*/
  border-bottom: solid 3px ${Color['grey']}; /*下線*/
`;

export const Title = (props) => {
  return <StyledTitle color={props.color}>{props.children}</StyledTitle>;
};

export const PageTitle = (props) => {
  return (
    <PageTitleWrapper>
      <StyledTitle color={props.color}>{props.children}</StyledTitle>
    </PageTitleWrapper>
  );
};

export const PageSubTitle = (props) => {
  return (
    <PageSubTitleWrapper>
      <StyledSubTitle color={props.color}>{props.children}</StyledSubTitle>
    </PageSubTitleWrapper>
  );
};

export const ModalTitle = (props) => {
  return <StyledModalTitle color={props.color}>{props.children}</StyledModalTitle>;
};
