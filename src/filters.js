import Converter from 'color-convert';

export default {
  /**
   * Overwrite buffer with decolorized image using passed setting.
   * @param {ImageData} buffer
   * @param {object} setting
   * @param {number} width
   */
  decolorizeWithoutKeyColor(buffer, setting, width) {
    let height = (buffer.data.length / 4) / width;
    this.apply(buffer, setting, width, height, (buffer, idx) => {
      let key = Converter.hex.hsv(setting.key);
      let hsv = Converter.rgb.hsv(buffer[idx], buffer[idx+1], buffer[idx+2]);

      let distance = Math.sqrt(
        setting.h_weight * (Math.pow(this.getHueDistance(key[0], hsv[0]), 2)) +
        setting.s_weight * (Math.pow(key[1] - hsv[1], 2)) +
        setting.v_weight * (Math.pow(key[2] - hsv[2], 2))
      );
      if (distance > setting.threshold) {
        this.decolorizePixel(buffer, idx);
      }
    });
  },
  /**
   * Return the distance between key and target.
   * @param {number[]} key HSV Color that used as origin.
   * @param {number[]} target HSV Color that currently processed.
   * @returns {number}
   */
  getHueDistance(key, target) {
    let dis = Math.abs(key - target);
    if (dis > 180) {
      dis = 360 - dis;
    }
    return dis * (256/180);
  },
  /**
   * Apply specified filter to ImageData buffer.
   * @param {ImageData} buffer Processed ImageData.
   * @param {object} setting setting object
   * @param {number} width width of output canvas
   * @param {number} height height of output canvas
   * @param {Function} filter Filter function that get {UInt16Array} and cursor index.
   */
  /* eslint-disable */
  apply(buffer, setting, width, height, filter) {
    let pixelsCount = buffer.data.length / 4;
    let pixels = buffer.data;

    // no area selection
    if (setting.areaLeftTop[0] === 0 && setting.areaLeftTop[1] === 0 &&
      setting.areaRightBottom[0] === 1 && setting.areaRightBottom[1] === 1) {
      for (let i = 0; i < (pixelsCount*4)-1; i += 4) {
        filter(pixels, i);
      }
      return;
    }

    for (let i = 0; i < (pixelsCount*4)-1; i += 4) {
      let pidx = i / 4;
      let x = ((pidx % width) + 1) / width;
      let y = ((pidx / width) + 1) / height;

      if ((x < setting.areaLeftTop[0]) || (x > setting.areaRightBottom[0]) ||
        (y < setting.areaLeftTop[1]) || (y > setting.areaRightBottom[1])
      ) {
        this.decolorizePixel(pixels, i);
      } else {
        filter(pixels, i);
      }
    }
  },
  /**
   * Decolorize a pixel([r, g, b, a]) in buffer using head index.
   * @param {Uint8ClampedArray} buffer Processed ImageData buffer.
   * @param {number} idx Head (R-channel) index of processing pixel.
   */
  decolorizePixel(buffer, idx) {
    let hsl = Converter.rgb.hsl.raw(buffer[idx], buffer[idx+1], buffer[idx+2]);
    let decolorized = Converter.hsl.rgb(hsl[0], 0, hsl[2]);
    buffer[idx] = decolorized[0];
    buffer[idx+1] = decolorized[1];
    buffer[idx+2] = decolorized[2]
  },
  /**
   * Convert RGBA color to hex string; ex. "#FFA500".
   * @param {number[] | Uint8ClampedArray} pixel
   * @returns {string}
   */
  rgbToHex(pixel) {
    return Converter.rgb.hex(pixel);
  },
}