import styled from 'styled-components';
import pallete from 'styles/colors';

const LevelTag = styled.div`
  display: inline-block;
  margin-left: 0.08rem;
  padding: 0 0.08rem;
  color: ${pallete.white};
  font-size: 0.24rem;
  border-radius: 0.04rem;
  background-color: ${pallete.text.yellow}
`;

export default LevelTag;
