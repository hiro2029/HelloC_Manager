import styled from 'styled-components';
import {Color} from '../../constants/Color';
import {BallTriangle} from 'react-loader-spinner';

const StyledLoadingWindow = styled.div`
  z-index: 5;
`;

const LoadingWindowOverlay = styled.div`
  background-color: ${Color['blackGrey']};
  width: 100vw;
  height: 100vh;
  opacity: 50%;
`;

const LoadingContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-row-gap: 15px;
  justify-items: center;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 30px;
  letter-spacing: 2px;
`;

const StyledLoader = styled.div``;

export const LoadingWindow = () => {
  return (
    <StyledLoadingWindow>
      <LoadingWindowOverlay></LoadingWindowOverlay>
      <LoadingContent>
        <StyledLoader>
          <BallTriangle
            ariaLabel='LoadingIndicator'
            width={150}
            height={150}
            color={Color['lightBlue']}
            secondaryColor='white'
          />
        </StyledLoader>
        <LoadingText>Loading Now...</LoadingText>
      </LoadingContent>
    </StyledLoadingWindow>
  );
};
