import styled from 'styled-components';

import {PrimaryButton} from '../PrimaryButton';
import {RelationSelectBox} from '../../Forms/SelectBox';

const StyledEditRelationButtonList = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template-columns: 40% 20% 20%;
  grid-template-rows: max-content;
  align-items: baseline;
  justify-content: center;
  grid-column-gap: 20px;
`;

export const EditRelationButtonList = (props) => {
  return (
    <StyledEditRelationButtonList>
      <RelationSelectBox id='EditRelation' label='教材名' onChange={props.onChange}>
        {props.children}
      </RelationSelectBox>
      <PrimaryButton onClick={props.onAdd} sizeY='small'>
        追加
      </PrimaryButton>
      <PrimaryButton color='secondary' onClick={props.onDelete} sizeY='small'>
        削除
      </PrimaryButton>
    </StyledEditRelationButtonList>
  );
};
