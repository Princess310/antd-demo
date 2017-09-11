const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = resolve;
    image.src = path;
  });
};

/**
 * Image preloader
 * @param {Object} options
 */
const ImagePreloader = function (images) {
  const deffers = images.map((img) => preloadImage(img));

  return Promise.all(deffers);
};

export default ImagePreloader;