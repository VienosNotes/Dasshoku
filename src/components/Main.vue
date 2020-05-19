<template>
  <div class="main-frame">
    <div id="images-container">
      <div id="orig-image-container" class="image-container">
        <canvas id="orig-image-canvas" width="400" height="300"
                @click="chooseColor"></canvas>
      </div>
      <div>
        <!--suppress CheckImageSize -->
        <img src="../assets/gradient_triangle.png" width="110" alt="gradient triangle"
             @click="execWithKey">
      </div>
      <div id="dasshoku-image-container" class="image-container">
        <canvas id="dasshoku-image-canvas" width="400" height="300"></canvas>
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
          <vue-slider v-model="threshold" :min="0" :max="100"></vue-slider>
        </div>
        <div class="controller">
          <div>Hue Weight: {{h_weight}}</div>
          <vue-slider v-model="h_weight" :min="0" :max="10"></vue-slider>
        </div>
        <div class="controller">
          <div>Saturation Weight: {{s_weight}}</div>
          <vue-slider v-model="s_weight" :min="0" :max="10"></vue-slider>
        </div>
        <div class="controller">
          <div>Brightness Weight: {{v_weight}}</div>
          <vue-slider v-model="v_weight" :min="0" :max="10"></vue-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlankImage from '../assets/test.jpg';
import Filters from '../filters.js';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css';

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
  mounted() {
    this.selectedColor = "#FF0000";
    this.threshold = 100;
    this.h_weight = 1;
    this.s_weight = 1;
    this.v_weight = 1;


    let ctx = this.origCtx;
    let img = new Image();
    img.addEventListener('load', () => {
      this.drawImage(ctx, img);
      this.exec();
    });
    img.src = BlankImage;
  },
  methods: {
    initImages(ev) {
      let file = ev.currentTarget.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', event => {
        let data = event.target.result;
        let image = new Image();
        image.addEventListener('load', () => {
          this.drawImage(this.origCtx, image);
          this.exec();
        });
        image.src = data;
      });
      reader.readAsDataURL(file);
    },
    drawImage(ctx, img) {
      console.log(ctx);
      ctx.drawImage(img, 0, 0, 400, 300);
    },
    exec() {
      let origBuffer = this.origCtx.getImageData(0, 0, this.origCanvas.width, this.origCanvas.height);
      Filters.decolorize(origBuffer);
      this.dasshokuCtx.putImageData(origBuffer, 0, 0);
    },
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
    chooseColor(ev) {
      let posX = ev.pageX - ev.target.getBoundingClientRect().x;
      let posY = ev.pageY - ev.target.getBoundingClientRect().y;
      let pointBuffer = this.origCtx.getImageData(posX, posY, 1, 1);
      let pointPixel = pointBuffer.data;
      this.selectedColor = `#${Filters.rgbToHex(pointPixel)}`;
      this.execWithKey();
    }
  },
  computed: {
    origCtx() {
      let canvas = this.origCanvas;
      return canvas.getContext('2d');
    },
    origCanvas() {
      return document.getElementById('orig-image-canvas');
    },
    dasshokuCtx() {
      let canvas = this.dasshokuCanvas;
      return canvas.getContext('2d');
    },
    dasshokuCanvas() {
      return document.getElementById('dasshoku-image-canvas');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

#images-container
  display flex
  justify-content center
  align-items center

.image-container
  padding-left 50px
  padding-right 50px
  padding-top 20px

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

</style>
