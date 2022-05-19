import {useContext} from 'react';
import styled from 'styled-components';
import {AuthContext} from '../../contexts/AuthContext';

const StyledHome = styled.div`
  font-size: 25px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 20vh;
`;

const Home = () => {
  const {authData} = useContext(AuthContext);
  return (
    <StyledHome>
      HelloCManager制作中です
      {authData && <div>ログイン者：{authData.name}</div>}
    </StyledHome>
  );
};

export default Home;
