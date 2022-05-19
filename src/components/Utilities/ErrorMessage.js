import styled from 'styled-components';
import {paddingX} from '../../constants/Padding';
import {Color} from '../../constants/Color';
import {Close} from '@material-ui/icons';

const ErrorMessageModal = styled.div`
  position: relative;
  background-color: ${Color['white']};
  width: 100%;
  padding: ${paddingX['small']} ${paddingX['medium']};
  border: solid 3px ${Color['error']};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

const ErrorMessageText = styled.span`
  color: ${Color['error']};
`;

const CloseIcon = styled(Close)`
  position: absolute;
  top: 10px;
  right: 15px;
  color: ${Color['error']};
  cursor: pointer;
`;

export const ErrorMessage = (props) => {
  return (
    <ErrorMessageModal>
      <ErrorMessageText>{props.text}</ErrorMessageText>
      <CloseIcon onClick={() => props.onClose()} />
    </ErrorMessageModal>
  );
};

export const ErrorMessageWrapper = styled.div`
  width: 80vw;
  position: fixed;
  left: 50%;
  top: ${({isOpen}) => (isOpen ? '10%' : '-30%')};
  transform: translateX(-50%);
  z-index: 20;
  transition: top 0.5s;
`;
