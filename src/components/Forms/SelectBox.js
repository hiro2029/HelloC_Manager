import styled from 'styled-components';

const StyledSelectBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 10px;
  padding-bottom: 30px;
`;

const SelectLabel = styled.label`
  font-size: 20px;
`;

const Select = styled.select``;

export const UserSelectBox = (props) => {
  return (
    <StyledSelectBox>
      <SelectLabel htmlFor={props.id}>{props.label}</SelectLabel>
      <Select id={props.id} onChange={props.onChange}>
        <option value='' key=''>
          -
        </option>
        {props.options.map((data) => {
          if (data.user_id === props.value) {
            return (
              <option value={data.user_id} key={data.user_id} selected>
                {data.name}
              </option>
            );
          } else {
            return (
              <option value={data.user_id} key={data.user_id}>
                {data.name}
              </option>
            );
          }
        })}
      </Select>
    </StyledSelectBox>
  );
};

export const RelationSelectBox = (props) => {
  return (
    <StyledSelectBox>
      <SelectLabel htmlFor={props.id}>{props.label}:</SelectLabel>
      <Select onChange={props.onChange}>{props.children}</Select>
    </StyledSelectBox>
  );
};
