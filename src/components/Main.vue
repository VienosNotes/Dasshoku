<template>
  <div class="main-frame">
    <div id="images-container">
      <div id="orig-image-container" class="image-container">
        <canvas id="orig-image-canvas" width="400" height="300"></canvas>
      </div>
      <div>
        <!--suppress CheckImageSize -->
        <img src="../assets/gradient_triangle.png" width="110" alt="gradient triangle"
             @click="exec">
      </div>
      <div id="dasshoku-image-container" class="image-container">
        <canvas id="dasshoku-image-canvas" width="400" height="300"></canvas>
      </div>
    </div>
    <div>
      <input type="file" id="orig-image-selector" name="Choose"
             accept="image/*" @input="initImages">
    </div>
  </div>
</template>

<script>
import BlankImage from '../assets/test.jpg';
import Filters from '../filters.js';

export default {
  name: 'Main',  
  props: {
    msg: String,
    selectedColor: Array
  },
  mounted() {
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
</style>
