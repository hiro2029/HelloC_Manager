import styled from 'styled-components';

const StyledInputBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

const InputLabel = styled.label``;

const Box = styled.input``;

export const InputBox = (props) => {
  return (
    <StyledInputBox>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Box id={props.id} onChange={props.onChange} value={props.value} type={props.type ? props.text : 'text'}></Box>
    </StyledInputBox>
  );
};
