import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {Color} from '../../constants/Color';
import {SizeX, SizeY, FontSize} from '../../constants/Button';

const StyledButton = styled(Button)`
  font-size: ${(props) => (props.fontSize ? FontSize[props.fontSize] : FontSize['medium'])} !important;
  padding: ${(props) => (props.sizeY ? SizeY[props.sizeY] : SizeY['medium'])}
    ${(props) => (props.sizeX ? SizeX[props.sizeX] : SizeX['medium'])} !important;
  color: ${(props) => (props.color ? Color[props.color] : Color['white'])} !important;
`;

/* 
color: ボタンの色 default:primary
onClick: 押したときの挙動
textColor: ボタンのテキストの色 default:white
sizeX: ボタンの横サイズ default: medium(20px)
sizeY: ボタンの縦サイズ default:medium(10px)
fontSize: ボタンのテキストサイズ default:medium(18px)
*/

export const PrimaryButton = (props) => {
  return (
    <StyledButton
      variant='contained'
      color={props.color ? props.color : 'primary'}
      onClick={props.onClick}
      textColor={props.textColor}
      sizeX={props.sizeX}
      sizeY={props.sizeY}
      fontSize={props.fontSize}
    >
      {props.children}
    </StyledButton>
  );
};
