import styled from 'styled-components';

const StyledLabel = styled.span`
  border: solid 2px #777;
  padding: 2px 10px;
  margin-right: 20px;
`;

export const Label = (props) => {
  return <StyledLabel>{props.children}</StyledLabel>;
};
