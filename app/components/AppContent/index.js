import styled from 'styled-components';
import pallete from 'styles/colors';

const AppContent = styled.div`
  position: absolute;
  top: 0.9rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
  & .am-list-body {
    background-color: ${pallete.background.antd};
  }
`;

export default AppContent;
