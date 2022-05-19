import styled from 'styled-components';

const StyledTextArea = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

const InputLabel = styled.label``;

const Area = styled.textarea``;

export const TextArea = (props) => {
  return (
    <StyledTextArea>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Area id={props.id} onChange={props.onChange} value={props.value} rows={props.rows ? props.rows : 5}></Area>
    </StyledTextArea>
  );
};
