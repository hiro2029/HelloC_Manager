import styled from 'styled-components';

import {Link} from 'react-router-dom';
import {Color} from '../../constants/Color';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({color}) => (color ? Color[color] : '#000')};
  font-size: 16px;
  letter-spacing: 1.4px;
  &:hover: {
    text-decoration: none;
    color: ${({color}) => (color ? Color[color] : '#000')};
  }
`;

export const Anchor = (props) => {
  return (
    <StyledLink style={{textDecoration: 'none'}} to={props.to} onClick={props.onClick} color={props.color}>
      {props.children}
    </StyledLink>
  );
};
