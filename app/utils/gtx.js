class Gtx {
  constructor(arg) {
    let ctx = arg;

    // if it is a cavans object.
    if (typeof arg.getContext === 'function') {
      ctx = arg.getContext('2d');
    }

    // This allow to use the new or just the method as a factory
    if (!(this instanceof Gtx)) {
      return new Gtx(ctx);
    }

    this.context = this.ctx = ctx;

    // build the prototype methods on first demand
    if (!this.beginPath) {
      setupPrototype();
    }

    return this;
  }

  static version = '0.5.0-SNAPSHOT'

  /**
   * This will make this canvas fit its parent HTML element.
   */
  fitParent() {
    const canvas = this.canvas();
    if (canvas) {
      const parent = canvas.parentNode;
      // we might want to use innerWidth/Height here.
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    return this;
  }

  clear() {
    if (this.canvas()) {
      // this should create a clear
      this.canvas().width = this.canvas().width;
    }
    // if no canvas (was created with a context), just ignore.

    return this;
  }

  // create the chainable object for gradient
  createLinearGradient(x0, y0, x1, y1) {
    const ctxGradient = this.ctx.createLinearGradient(x0, y0, x1, y1);
    const gtxGradient = new Gradient(ctxGradient);
    return gtxGradient;
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    const ctxGradient = this.ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    const gtxGradient = new Gradient(ctxGradient);
    return gtxGradient;
  }

  setFillStyle(arg) {
    return this.setStyle(this, 'fillStyle', arg);
  }

  setStrokeStyle(arg) {
    return this.setStyle(this, 'strokeStyle', arg);
  }

  setStyle(g, type, arg) {
    const newG = g;
    // if getter
    if (!arg) {
      return newG.ctx[type];
    }

    // if it is a gradient object, extract the value
    // if (arg.ctxGradient) {
    //   arg = arg.ctxGradient;
    // }

    newG.ctx[type] = arg;
    return newG;
  }
}

class Gradient {
  constructor(ctxGradient) {
    this.ctxGradient = ctxGradient;
  }
}

function setupPrototype() {
  const methods = ['beginPath', 'clip', 'closePath', 'drawImage', 'fill', 'fillText',
    'arc', 'arcTo', 'lineTo', 'moveTo', 'bezierCurveTo', 'quadraticCurveTo', 'rect',
    'clearRect', 'fillRect', 'strokeRect', 'translate', 'rotate', 'save',
    'scale', 'setTransform', 'stroke', 'strokeText', 'transform', 'setLineDash'];

  const getterMethods = ['createPattern', 'drawFocusRing', 'isPointInPath', 'measureText', 'getLineDash',
    // drawFocusRing not currently supported
    // The following might instead be wrapped to be able to chain their child objects
    'createImageData', 'getImageData', 'putImageData',  // will wrap later
    // both of those are wrapped now >> 'createLinearGradient', 'createRadialGradient',
  ];

  const props = ['canvas',
    // we are wrapping this one >> 'strokeStyle', 'fillStyle',
    'font', 'globalAlpha', 'globalCompositeOperation', 'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'textAlign', 'textBaseline'];

  for (let i = 0, methl = methods.length; i < methl; i += 1) {
    const m = methods[i];
    Gtx.prototype[m] = (function (nm) {
      return function () {
        this.ctx[nm].apply(this.ctx, arguments);
        return this;
      };
    }(m));
  }

  for (let i = 0, gmethl = getterMethods.length; i < gmethl; i += 1) {
    const gm = getterMethods[i];
    Gtx.prototype[gm] = (function (ngm) {
      return function () {
        return this.ctx[ngm].apply(this.ctx, arguments);
      };
    }(gm));
  }

  for (let i = 0, propl = props.length; i < propl; i += 1) {
    const p = props[i];
    Gtx.prototype[p] = (function (np) {
      return function (value) {
        if (typeof value === 'undefined') {
          return this.ctx[p];
        }
        this.ctx[np] = value;
        return this;
      };
    }(p));
  }
}

export default Gtx;
