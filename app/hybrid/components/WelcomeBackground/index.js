import styled from 'styled-components';
import pallete from 'styles/colors';
import img from 'assets/images/hybrid-background.png';

const WelcomeBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.2rem 0;
  background-color: ${pallete.background.blue};
  background-image: url(${img});
  background-position: center center;
  background-size: 100% 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

export default WelcomeBackground;
