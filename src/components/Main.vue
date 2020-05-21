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
        <div id="buttons-container">
            <label id="open-button" class="label-button" v-show="!isProcessing">
              <span class="material-icons button-icon">
                add_photo_alternate
              </span>
              <span>Open</span>
              <input type="file" id="orig-image-selector" name="Choose"
                     accept="image/*" @input="initImages">
            </label>
            <label id="save-button" class="label-button" @click="save" v-show="!isProcessing">
              <span class="material-icons button-icon">
                save_alt
              </span>
              <span>Save</span>
            </label>
            <label id="proc-label" v-show="isProcessing">
                <span>Dasshoku Processing...</span>
            </label>
        </div>
        <div id="palette-container">
            <div class="palette">
                <div id="color-chooser" class="controller">
                    Chosen Color: <span id="chosen-color-sample" :style="{ background: selectedColor }"></span><span>{{selectedColor}}</span>
                </div>

                <div class="controller">
                    <div>Threshold: {{threshold}}</div>
                    <vue-slider v-model="threshold" :data="threshold_range" :lazy="true"></vue-slider>
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
  const aspect_ratio = 3 / 4;
  const max_threshold = 200; // maximum threshold of distance

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
        selectedColor: "#DB7B97",
        threshold: 149,
        h_weight: 2.6,
        s_weight: 8.2,
        v_weight: 6.3,
        latestUrl: String,
        threshold_range: [],
        image: Image,
        isProcessing: false
      }
    },
    watch: {
      selectedColor() {
        this.execWithKey(this.origCanvas, this.dasshokuCanvas)
      },
      threshold() {
        this.execWithKey(this.origCanvas, this.dasshokuCanvas)
      },
      h_weight() {
        this.execWithKey(this.origCanvas, this.dasshokuCanvas)
      },
      s_weight() {
        this.execWithKey(this.origCanvas, this.dasshokuCanvas)
      },
      v_weight() {
        this.execWithKey(this.origCanvas, this.dasshokuCanvas)
      }
    },
    mounted() {
      let range = [...Array(max_threshold + 1).keys()];
      range.reverse();
      this.threshold_range = range;

      // noinspection ES6ModulesDependencies
      let vpWidth = window.visualViewport.width;
      console.log(window.visualViewport);
      if (vpWidth <= sp_threshold) {
        this.applySpStyle(vpWidth);
      }

      let ctx = this.origCtx;
      let img = new Image();
      img.addEventListener('load', () => {
        this.image = img;
        this.drawImage(ctx, img, this.origCanvas.width, this.origCanvas.height);
        this.execWithKey(this.origCanvas, this.dasshokuCanvas);
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
            this.image = image;
            this.drawImage(this.origCtx, image, this.origCanvas.width, this.origCanvas.height);
            this.execWithKey(this.origCanvas, this.dasshokuCanvas);
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
          ctx.drawImage(img, 0, (height - (width / iAspect)) / 2, width, width / iAspect);
        } else {
          ctx.drawImage(img, (width - (height * iAspect)) / 2, 0, height * iAspect, height);
        }
      },
      /**
       * Redraw decolorized image with current parameters.
       */
      execWithKey(canvas, outputCanvas) {
        let origBuffer = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        Filters.decolorizeWithoutKeyColor(origBuffer, this.currentSetting);
        outputCanvas.getContext('2d').putImageData(origBuffer, 0, 0);
      },
      /**
       * Choose color from clicked pixel.
       * @param {MouseEvent} ev
       */
      chooseColor(ev) {
        let pointBuffer = this.origCtx.getImageData(ev.offsetX, ev.offsetY, 1, 1);
        let pointPixel = pointBuffer.data;
        this.selectedColor = `#${Filters.rgbToHex(pointPixel)}`;

        // on the canvas but out of the image
        if (pointPixel[3] === 255) {
          return;
        }

        this.execWithKey();
      },
      applySpStyle(vpWidth) {
        let canvasWidth = Math.min(vpWidth * 0.7, 600);
        console.log(vpWidth);
        console.log(canvasWidth);
        this.origCanvas.width = canvasWidth;
        this.origCanvas.height = Math.floor(canvasWidth * aspect_ratio);
        this.dasshokuCanvas.width = canvasWidth;
        this.dasshokuCanvas.height = Math.floor(canvasWidth * aspect_ratio);
      },
      save() {
        this.applyProcessingStyle(true);
        setTimeout(() => {
          let canvas = document.createElement('canvas');
          canvas.width = this.image.width;
          canvas.height = this.image.height;
          let ctx = canvas.getContext('2d');
          this.drawImage(ctx, this.image, canvas.width, canvas.height);
          this.execWithKey(canvas, canvas);

          canvas.toBlob(b => {
            let url = URL.createObjectURL(b);
            let anchor = document.createElement('a');
            anchor.href = url;
            let now = new Date(Date.now());
            anchor.download = `dasshoku_${now.getFullYear()}${now.getMonth()}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;
            anchor.click();
            this.applyProcessingStyle(false);
            URL.revokeObjectURL(url);
          });
        }, 500);
      },
      applyProcessingStyle(isProcessing) {
        this.isProcessing = isProcessing;
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
        // noinspection JSValidateTypes
        return document.getElementById('orig-image-canvas');
      },
      /**
       * Canvas for decolorized image.
       * @returns {HTMLCanvasElement}
       */
      dasshokuCanvas() {
        // noinspection JSValidateTypes
        return document.getElementById('dasshoku-image-canvas');
      },
      currentSetting() {
        return {
          key: this.selectedColor,
          h_weight: this.h_weight,
          s_weight: this.s_weight,
          v_weight: this.v_weight,
          threshold: this.threshold
        };
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
    $themeColor = #ffa500
    @import '../assets/slider.css'

    $threshold = 1500

    .image-container

        @media screen and (min-width: $threshold+ 1 px)
            padding-left 50px
            padding-right 50px
            padding-top 20px

        @media screen and (max-width: $threshold px)
            padding-left 50px
            padding-right 50px
            padding-top 0

    #images-container

        @media screen and (min-width: $threshold+ 1 px)
            display flex
            justify-content center
            align-items top
            position relative
            flex-wrap wrap

        @media screen and (max-width: $thoreshold px)
            display flex
            justify-content center
            align-items center
            position relative
            flex-wrap wrap
            flex-direction column

    #click-caption
        color darkgray
        user-select none

        @media screen and (max-width: $threshold px)
            margin-top 0
            margin-bottom 5px

    #triangle-img
        @media screen and (max-width: $threshold px)
            transform rotate(90deg)
            height 30px
            width 30px

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

    label input
        display none

    #buttons-container
        display flex
        justify-content center
        align-items top

    .button-icon
        vertical-align bottom

    #open-button
        color white
        background orange
        padding 3px 5px 3px 3px
        border solid 1px orange
        cursor pointer
        border-radius 4px
        display block

    #save-button
        color white
        background gray
        padding 3px 5px 3px 3px
        border solid 1px gray
        cursor pointer
        border-radius 4px
        display block

    .label-button
        margin 0 20px 0 20px
        user-select none

    .label-button:hover
        opacity 0.7

    #proc-label
        margin 0 20px 0 20px
        user-select none
        color white
        background linear-gradient(to right, orange, gray)
        padding 3px 20px 3px 20px
        border-radius 4px
</style>
