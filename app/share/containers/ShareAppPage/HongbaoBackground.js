import styled from 'styled-components';
import pallete from 'styles/colors';
import img from 'assets/images/share-background-hongbao.png';

const HongbaoBackground = styled.div`
  position: relative;
  height: 9rem;
  width: 100%;
  padding: 0.3rem 0.36rem;
  background-color: #6bd2de;
  background-image: url(${img});
  background-position: center center;
  background-size: 100% 100%;
`;

export default HongbaoBackground;
