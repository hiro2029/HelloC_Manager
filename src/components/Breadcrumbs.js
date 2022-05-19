import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Anchor} from './Utilities/Anchor';
import {Color} from '../constants/Color';

const LinkSpan = styled.span`
  font-size: 24px;
`;

const LinkSlash = styled.span`
  margin: 0 10px;
  font-weight: bold;
`;

const BreadcrumbsLink = styled(Link)`
  text-decoration: none;
  color: ${Color['blue']};
  &:hover: {
    text-decoration: none;
    color: ${Color['blue']};
  }
`;

const StyledBreadcrumb = styled.div`
  margin: 20px;
  margin-top: 30px;
`;

const getLinkName = (name) => {
  switch (name) {
    case 'home':
      return 'Home';
    case 'book':
      return '教材一覧';
    case 'group':
      return 'グループ一覧';
    case 'user':
      return 'ユーザ一覧';
    case 'question':
      return '問題一覧';
    case 'createBlank':
      return '空欄補充問題作成';
    default: {
      if (name.match(/[\d+]/)) {
        return '詳細:' + name;
      } else {
        return name;
      }
    }
  }
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const [paths, setPaths] = useState();
  useEffect(() => {
    const pathNames = location.pathname.split('/').filter((x) => x);
    let path = '';
    const pathobj = pathNames.map((name) => {
      path = path + '/' + name;
      return {name: getLinkName(name), route: path};
    });
    setPaths([{name: 'Home', route: '/'}, ...pathobj]);
  }, [location]);
  return (
    <StyledBreadcrumb>
      {paths &&
        paths.map((path, index) => {
          return (
            <LinkSpan>
              <BreadcrumbsLink style={{textDecoration: 'none'}} to={path.route}>
                {path.name}
              </BreadcrumbsLink>
              {index !== paths.length - 1 && <LinkSlash>/</LinkSlash>}
            </LinkSpan>
          );
        })}
    </StyledBreadcrumb>
  );
};
