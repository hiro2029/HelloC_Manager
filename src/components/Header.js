import {useState} from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {IconButton} from 'material-ui';
import Navigation from './Navigation';

const StyledHeader = styled(AppBar)`
  text-align: center;
  font-size: 20px;
  letter-spacing: 1.3px;
  color: #fff;
  flex-direction: row !important;
  align-items: center; /* 縦方向中央揃え */
  padding: 5px 0;
  z-index: 10;
`;

const HeaderTitle = styled(Typography)`
  letter-spacing: 1px !important;
`;

const StyledMenuIcon = styled(MenuIcon)`
  width: 100% !important;
  height: 100% !important;
`;

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <div>
      <Navigation open={openNavigation} setOpenNavigation={setOpenNavigation}></Navigation>
      <StyledHeader position='static' onLeftIconButtonTouchTap={() => setOpenNavigation(true)}>
        <IconButton color='inherit' aria-label='Menu' onClick={() => setOpenNavigation(true)}>
          <StyledMenuIcon className='MenuIcon'></StyledMenuIcon>
        </IconButton>
        <HeaderTitle variant='h3' color='inherit'>
          HelloC Manager
        </HeaderTitle>
      </StyledHeader>
    </div>
  );
};

export default Header;
