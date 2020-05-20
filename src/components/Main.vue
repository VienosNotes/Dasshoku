<!--suppress JSUnresolvedVariable -->
<template>
  <div class="main-frame">
    <div id="images-container">
      <div id="orig-image-container" class="image-container">
        <canvas id="orig-image-canvas" width="600" height="400"
                @click="chooseColor"></canvas>
        <div id="click-caption">Click to pick the key color</div>
      </div>
      <div id="triangle">
        <!--suppress CheckImageSize -->
        <img src="../assets/gradient_triangle.png" width="110" alt="gradient triangle" id="triangle-img">
      </div>
      <div id="dasshoku-image-container" class="image-container">
        <canvas id="dasshoku-image-canvas" width="600" height="400"></canvas>
      </div>
    </div>
    <div>
      <input type="file" id="orig-image-selector" name="Choose"
             accept="image/*" @input="initImages">
    </div>
    <div id="palette-container">
      <div class="palette">
        <div id="color-chooser" class="controller">
        Chosen Color: <span id="chosen-color-sample" :style="{ background: selectedColor }"></span><span>{{selectedColor}}</span>
        </div>
        <div class="controller">
          <div>Threshold: {{threshold}}</div>
          <vue-slider v-model="threshold" :min="0" :max="200" :lazy="true"></vue-slider>
        </div>
        <div class="controller">
          <div>Hue Weight: {{h_weight}}</div>
          <vue-slider v-model="h_weight" :min="0" :max="10" :interval="0.1" :lazy="true"></vue-slider>
        </div>
        <div class="controller">
          <div>Saturation Weight: {{s_weight}}</div>
          <vue-slider v-model="s_weight" :min="0" :max="10" :interval="0.1" :lazy="true"></vue-slider>
        </div>
        <div class="controller">
          <div>Brightness Weight: {{v_weight}}</div>
          <vue-slider v-model="v_weight" :min="0" :max="10" :interval="0.1" :lazy="true"></vue-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlankImage from '../assets/test.jpg';
import Filters from '../filters.js';
import VueSlider from 'vue-slider-component';


const sp_threshold = 1500; // maximum smartphone screen width
const aspect_ratio = 3/4;

export default {
  name: 'Main',
  components: {
    VueSlider
  },
  props: {
    msg: String,
  },
  data() {
    return {
      selectedColor: String,
      threshold: Number,
      h_weight: Number,
      s_weight: Number,
      v_weight: Number,
    }
  },
  watch: {
    selectedColor() { this.execWithKey() },
    threshold() { this.execWithKey() },
    h_weight() { this.execWithKey() },
    s_weight() { this.execWithKey() },
    v_weight() { this.execWithKey() }
  },
  mounted() {
    this.selectedColor = "#DB7B97";
    this.threshold = 111;
    this.h_weight = 3.7;
    this.s_weight = 2.6;
    this.v_weight = 5.5;

    // noinspection ES6ModulesDependencies
    let vpWidth = window.visualViewport.width;
    console.log(window.visualViewport);
    if (vpWidth <= sp_threshold) {
      this.applySpStyle(vpWidth);
    }

    let ctx = this.origCtx;
    let img = new Image();
    img.addEventListener('load', () => {
      this.drawImage(ctx, img, this.origCanvas.width, this.origCanvas.height);
      this.execWithKey();
    });
    img.src = BlankImage;
  },
  methods: {
    /**
     * Initialize each canvases with loaded image and decolorized when <input> has got a new image.
     * @param {UIEvent} ev an input event of <input>.
     */
    initImages(ev) {
      // noinspection JSUnresolvedVariable
      let file = ev.currentTarget.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', event => {

        // noinspection JSUnresolvedVariable
        let data = event.target.result;
        let image = new Image();
        image.addEventListener('load', () => {
          this.drawImage(this.origCtx, image, this.origCanvas.width, this.origCanvas.height);
          this.execWithKey();
        });
        image.src = data;
      });
      reader.readAsDataURL(file);
    },
    /**
     * Draw an image into the 2D context as fitted for the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @param {HTMLImageElement} img
     * @param {number} width Width of Canvas
     * @param {number} height Height of Canvas
     */
    drawImage(ctx, img, width, height) {
      ctx.clearRect(0, 0, width, height);

      let iAspect = img.width / img.height;
      let cAspect = width / height;

      if (iAspect > cAspect) {
        ctx.drawImage(img, 0, (height - (width/iAspect))/2, width, width/iAspect);
      } else {
        ctx.drawImage(img, (width - (height*iAspect))/2, 0, height*iAspect, height);
      }
    },
    /**
     * Redraw decolorized image with current parameters.
     */
    execWithKey() {
      let origBuffer = this.origCtx.getImageData(0, 0, this.origCanvas.width, this.origCanvas.height);
      let setting = {
        key: this.selectedColor,
        h_weight: this.h_weight, s_weight: this.s_weight, v_weight: this.v_weight,
        threshold: this.threshold
      };
      Filters.decolorizeWithoutKeyColor(origBuffer, setting);
      this.dasshokuCtx.putImageData(origBuffer, 0, 0);
    },
    /**
     * Choose color from clicked pixel.
     * @param {MouseEvent} ev
     */
    chooseColor(ev) {
      let target = ev.target;
      let posX = ev.pageX - target.getBoundingClientRect().x;
      let posY = ev.pageY - target.getBoundingClientRect().y;
      let pointBuffer = this.origCtx.getImageData(posX, posY, 1, 1);
      let pointPixel = pointBuffer.data;
      this.selectedColor = `#${Filters.rgbToHex(pointPixel)}`;
      this.execWithKey();
    },
    applySpStyle(vpWidth) {
      let canvasWidth = Math.min(vpWidth - 100, 600);
      console.log(vpWidth);
      console.log(canvasWidth);
      this.origCanvas.width = canvasWidth;
      this.origCanvas.height = Math.floor(canvasWidth * aspect_ratio);
      this.dasshokuCanvas.width = canvasWidth;
      this.dasshokuCanvas.height = Math.floor(canvasWidth * aspect_ratio);
    }
  },
  computed: {
    /**
     * 2D Context of original image canvas.
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     */
    origCtx() {
      let canvas = this.origCanvas;
      return canvas.getContext('2d');
    },
    /**
     * Canvas for original image.
     * @returns {HTMLCanvasElement}
     */
    origCanvas() {
      return document.getElementById('orig-image-canvas');
    },
    /**
     * 2D Context of decolorized image canvas.
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     */
    dasshokuCtx() {
      let canvas = this.dasshokuCanvas;
      return canvas.getContext('2d');
    },
    /**
     * Canvas for decolorized image.
     * @returns {HTMLCanvasElement}
     */
    dasshokuCanvas() {
      return document.getElementById('dasshoku-image-canvas');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
$themeColor = #ffa500
@import '../assets/slider.css'

$threshold = 1500



.image-container

  @media screen and (min-width: $threshold+1 px)
    padding-left 50px
    padding-right 50px
    padding-top 20px

  @media screen and (max-width: $threshold px)
    padding-left 50px
    padding-right 50px
    padding-top 0

#images-container

  @media screen and (min-width: $threshold+1 px)
    display flex
    justify-content center
    align-items top
    position relative
    flex-wrap wrap

  @media screen and (max-width: $thoreshold px)
    display flex
    flex-direction row
    justify-content center
    align-items top
    position relative
    flex-wrap wrap
    flex-direction column

#click-caption
  @media screen and (max-width: $threshold px)
    margin-top 0
    margin-bottom 5px

#triangle-img
  @media screen and (max-width: $threshold px)
    transform rotate(90deg)
    height 30px
    width 30px

#orig-image-selector
  margin 10px

#palette-container
  display flex
  justify-content space-around
  align-items top

#color-chooser
  vertical-align center

#chosen-color-sample
  display inline-block
  height 15px
  width 15px
  margin 5px 5px 0 5px

.controller
  margin 20px
  text-align left

.palette
  width 1000px

#triangle
  align-self center

</style>
