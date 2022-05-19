import styled from 'styled-components';

const ModalWindow = styled.div`
  position: fixed;
  min-width: 500px;
  width: 40%;

  background-color: #fffeee;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 50px;
`;

export const Modal = (props) => {
  return <ModalWindow>{props.children}</ModalWindow>;
};
