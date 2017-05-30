import InlineStylePrefixer from 'inline-style-prefixer';

const autoprefixer = (style) => {
  const prefixer = new InlineStylePrefixer({
    userAgent: navigator.userAgent,
  });

  return prefixer.prefix(style);
};

export default autoprefixer;
