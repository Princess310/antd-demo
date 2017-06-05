import styled from 'styled-components';
import pallete from 'styles/colors';

const LineTag = styled.div`
  display: inline-block;
  height: 0.3rem;
  padding: 0 0.08rem;
  fontSize: 0.20rem;
  line-height: 0.3rem;
  color: ${pallete.text.tag};
  border: 0.01rem ${pallete.theme} solid;
  border-radius: 0.3rem;
`;

export default LineTag;
