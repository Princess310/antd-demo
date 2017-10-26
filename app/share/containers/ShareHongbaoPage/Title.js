import React from 'react';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import img from 'assets/images/share-hongbao-title-bar.png';

const wordsStyle = {
  marginTop: '0.16rem',
  fontSize: '0.48rem',
  fontWeight: 'bolder',
  letterSpacing: '0.12rem',
  transform: 'scaleY(1.2)',
};

const wordStyle = {
  WebkitMaskImage: '-webkit-gradient(linear, left 0, right 0, from(#f1ad92), to(transparent))',
};

function Title(props) {
  return (
    <div>
      <FlexCenter style={{ height: '2.1rem', backgroundColor: '#d5392a', color: '#f1ad92' }}>
        <FlexColumnCenter>
          <section style={{ fontSize: '0.24rem', letterSpacing: '0.15rem' }}>红/包/广/告，更/加/有/效</section>
          <section style={wordsStyle}>
            <span style={wordStyle}>你</span>
            <span style={wordStyle}>也</span>
            <span style={wordStyle}>来</span>
            <span style={wordStyle}>下</span>
            <span style={wordStyle}>载</span>
            <span style={wordStyle}>体</span>
            <span style={wordStyle}>验</span>
            <span style={wordStyle}>吧</span>
          </section>
        </FlexColumnCenter>
      </FlexCenter>
      <img src={img} style={{ marginTop: '-0.02rem', display: 'block', width: '100%', height: 'auto' }} />
    </div>
  );
}

Title.propTypes = {

};

export default Title;
