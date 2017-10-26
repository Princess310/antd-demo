import styled from 'styled-components';
import img from 'assets/images/line-tag-bar.png';

const LineTagBar = styled.div`
  display: inline-flex;
  height: 0.3rem;
  fontSize: 0.20rem;
  line-height: 0.3rem;
  color: #f1ad92;
  background-color: #d5392a;

  &::before {
    content: '';
    display: inline-block;
    position: relative;
    right: 0.06rem;
    margin-right: 0.06rem;
    width: 0.06rem;
    height: 0.3rem;
    background-image: url(${img});
    background-size: 100% 100%;
  }

  &::after {
    content: '';
    display: inline-block;
    position: relative;
    left: 0.06rem;
    margin-left: 0.06rem;
    width: 0.06rem;
    height: 0.3rem;
    background-image: url(${img});
    background-size: 100% 100%;
    transform: rotate(180deg);
  }
`;

export default LineTagBar;
