import Converter from 'color-convert';
let minDistance = 100000000000;
export default {
  decolorizeWithoutKeyColor(buffer, setting) {
    this.apply(buffer, (buffer, idx) => {
      let key = Converter.hex.hsv(setting.key);
      let hsv = Converter.rgb.hsv(buffer[idx], buffer[idx+1], buffer[idx+2]);

      let distance = Math.sqrt(
        setting.h_weight * (Math.pow(this.getHueDistance(key[0], hsv[0]), 2)) +
        setting.s_weight * (Math.pow(key[1] - hsv[1], 2)) +
        setting.v_weight * (Math.pow(key[2] - hsv[2], 2))
      );

      if (idx%1000 === 0) {
        console.log(`${key[0]} -  ${hsv[0]} distance: ${this.getHueDistance(key[0], hsv[0])}`);
      }

      if (distance < minDistance) {
        minDistance = distance;
      }

      if (distance > setting.threshold) {
        this.decolorizePixel(buffer, idx);
      }
    });

    console.log(minDistance);
  },
  getHueDistance(key, target) {
    let dis = Math.abs(key - target);
    if (dis > 180) {
      dis = 360 - dis;
    }
    return dis;
  },
  decolorize(buffer) {
    this.apply(buffer, this.decolorizePixel);
  },
  apply(buffer, filter) {
    let pixelsCount = buffer.data.length / 4;
    let pixels = buffer.data;
    for (let i = 0; i < (pixelsCount*4)-1; i += 4) {
      filter(pixels, i);
    }
  },
  decolorizePixel(buffer, idx) {
    let hsl = Converter.rgb.hsl.raw(buffer[idx], buffer[idx+1], buffer[idx+2]);
    let decolorized = Converter.hsl.rgb(hsl[0], 0, hsl[2]);
    buffer[idx] = decolorized[0];
    buffer[idx+1] = decolorized[1];
    buffer[idx+2] = decolorized[2]
  },
  rgbToHex(pixel) {
    return Converter.rgb.hex(pixel);
  }
}