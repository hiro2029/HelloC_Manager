import styled from 'styled-components';

const StyledCodeBoard = styled.div`
  padding: 15px;
  color: white;
  display:grid;
  grid-row-gap:4px;
  background-color: black;
  border: 2px solid 
  border-radius: 20px;
  width: 80%;
  height:300px;
  overflow:scroll;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px 0;
  letter-spacing: 1px;
  font-size:16px;
  @media screen and (max-width:800px){
    font-size:12px;
    width:95%;
  }
`;

const CodeBlank = styled.span`
  padding: 0 3px;
`;

const CodeLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const CodeHead = styled.span`
  width: 40px;
`;

export const CodeBoard = (props) => {
  return (
    <StyledCodeBoard>
      {props.code.split('\n').map((code, index) => (
        <CodeLine key={index}>
          <CodeHead>{index + 1}.</CodeHead>
          {code.split(' ').map((char, index) => (
            <span key={index}>
              {char}
              <CodeBlank></CodeBlank>{' '}
            </span>
          ))}
        </CodeLine>
      ))}
    </StyledCodeBoard>
  );
};
