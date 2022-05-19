import styled from 'styled-components';

const OverrayComponent = styled.div`
  position: fixed;
  width: 120vw;
  height: 120vh;
  background-color: #00000070;
  z-index: 5;
  top: 0;
  left: 0;
`;

export const Overray = (props) => {
  return <OverrayComponent onClick={props.onClick}></OverrayComponent>;
};
