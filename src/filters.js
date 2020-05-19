import Converter from 'color-convert';

export default {
  decolorize(buffer) {
    console.log(buffer);
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
  }
}