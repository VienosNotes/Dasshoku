(function(t){function e(e){for(var r,s,o=e[0],h=e[1],l=e[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(r in h)Object.prototype.hasOwnProperty.call(h,r)&&(t[r]=h[r]);c&&c(e);while(d.length)d.shift()();return n.push.apply(n,l||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],r=!0,o=1;o<i.length;o++){var h=i[o];0!==a[h]&&(r=!1)}r&&(n.splice(e--,1),t=s(s.s=i[0]))}return t}var r={},a={app:0},n=[];function s(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=r,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],h=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var c=h;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"38b6":function(t,e,i){"use strict";var r=i("3a79"),a=i.n(r);a.a},"3a79":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var r=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[t._m(0),i("Main"),i("div",{attrs:{id:"caption"}},[t._v("このアプリはブラウザ上のみで動作するため、画像がサーバにアップロードされたりはしません。保存する場合は右クリックからどうぞ。")]),t._m(1)],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h1",[i("span",{attrs:{id:"logo-highlight"}},[t._v("D")]),t._v("asshoku")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",{attrs:{id:"copyright"}},[t._v("Created by "),i("a",{attrs:{href:"https://twitter.com/VienosNotes"}},[t._v("@VienosNotes")]),t._v(", "),i("a",{attrs:{href:"https://github.com/VienosNotes/Dasshoku"}},[t._v("Github")])])}],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main-frame"},[i("div",{attrs:{id:"images-container"}},[i("div",{staticClass:"image-container",attrs:{id:"orig-image-container"}},[i("canvas",{attrs:{id:"orig-image-canvas",width:"600",height:"400"},on:{click:t.chooseColor}}),i("div",[t._v("Click to pick the key color")])]),t._m(0),t._m(1)]),i("div",[i("input",{attrs:{type:"file",id:"orig-image-selector",name:"Choose",accept:"image/*"},on:{input:t.initImages}})]),i("div",{attrs:{id:"palette-container"}},[i("div",{staticClass:"palette"},[i("div",{staticClass:"controller",attrs:{id:"color-chooser"}},[t._v(" Chosen Color: "),i("span",{style:{background:t.selectedColor},attrs:{id:"chosen-color-sample"}}),i("span",[t._v(t._s(t.selectedColor))])]),i("div",{staticClass:"controller"},[i("div",[t._v("Threshold: "+t._s(t.threshold))]),i("vue-slider",{attrs:{min:0,max:200,lazy:!0},model:{value:t.threshold,callback:function(e){t.threshold=e},expression:"threshold"}})],1),i("div",{staticClass:"controller"},[i("div",[t._v("Hue Weight: "+t._s(t.h_weight))]),i("vue-slider",{attrs:{min:0,max:10,interval:.1,lazy:!0},model:{value:t.h_weight,callback:function(e){t.h_weight=e},expression:"h_weight"}})],1),i("div",{staticClass:"controller"},[i("div",[t._v("Saturation Weight: "+t._s(t.s_weight))]),i("vue-slider",{attrs:{min:0,max:10,interval:.1,lazy:!0},model:{value:t.s_weight,callback:function(e){t.s_weight=e},expression:"s_weight"}})],1),i("div",{staticClass:"controller"},[i("div",[t._v("Brightness Weight: "+t._s(t.v_weight))]),i("vue-slider",{attrs:{min:0,max:10,interval:.1,lazy:!0},model:{value:t.v_weight,callback:function(e){t.v_weight=e},expression:"v_weight"}})],1)])])])},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"triangle"}},[r("img",{attrs:{src:i("e146"),width:"110",alt:"gradient triangle"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"image-container",attrs:{id:"dasshoku-image-container"}},[i("canvas",{attrs:{id:"dasshoku-image-canvas",width:"600",height:"400"}})])}],h=(i("a9e3"),i("724e")),l=i.n(h),c=i("bb15"),u=i.n(c),d={decolorizeWithoutKeyColor:function(t,e){var i=this;this.apply(t,(function(t,r){var a=u.a.hex.hsv(e.key),n=u.a.rgb.hsv(t[r],t[r+1],t[r+2]),s=Math.sqrt(e.h_weight*Math.pow(i.getHueDistance(a[0],n[0]),2)+e.s_weight*Math.pow(a[1]-n[1],2)+e.v_weight*Math.pow(a[2]-n[2],2));s>e.threshold&&i.decolorizePixel(t,r)}))},getHueDistance:function(t,e){var i=Math.abs(t-e);return i>180&&(i=360-i),i},decolorize:function(t){this.apply(t,this.decolorizePixel)},apply:function(t,e){for(var i=t.data.length/4,r=t.data,a=0;a<4*i-1;a+=4)e(r,a)},decolorizePixel:function(t,e){var i=u.a.rgb.hsl.raw(t[e],t[e+1],t[e+2]),r=u.a.hsl.rgb(i[0],0,i[2]);t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2]},rgbToHex:function(t){return u.a.rgb.hex(t)}},g=i("4971"),v=i.n(g),f={name:"Main",components:{VueSlider:v.a},props:{msg:String},data:function(){return{selectedColor:String,threshold:Number,h_weight:Number,s_weight:Number,v_weight:Number}},watch:{selectedColor:function(){this.execWithKey()},threshold:function(){this.execWithKey()},h_weight:function(){this.execWithKey()},s_weight:function(){this.execWithKey()},v_weight:function(){this.execWithKey()}},mounted:function(){var t=this;this.selectedColor="#DB7B97",this.threshold=111,this.h_weight=3.7,this.s_weight=2.6,this.v_weight=5.5;var e=this.origCtx,i=new Image;i.addEventListener("load",(function(){t.drawImage(e,i,t.origCanvas.width,t.origCanvas.height),t.execWithKey()})),i.src=l.a},methods:{initImages:function(t){var e=this,i=t.currentTarget.files[0],r=new FileReader;r.addEventListener("load",(function(t){var i=t.target.result,r=new Image;r.addEventListener("load",(function(){e.drawImage(e.origCtx,r,e.origCanvas.width,e.origCanvas.height),e.execWithKey()})),r.src=i})),r.readAsDataURL(i)},drawImage:function(t,e,i,r){t.clearRect(0,0,i,r);var a=e.width/e.height,n=i/r;a>n?t.drawImage(e,0,(r-i/a)/2,i,i/a):t.drawImage(e,(i-r*a)/2,0,r*a,r)},execWithKey:function(){var t=this.origCtx.getImageData(0,0,this.origCanvas.width,this.origCanvas.height),e={key:this.selectedColor,h_weight:this.h_weight,s_weight:this.s_weight,v_weight:this.v_weight,threshold:this.threshold};d.decolorizeWithoutKeyColor(t,e),this.dasshokuCtx.putImageData(t,0,0)},chooseColor:function(t){var e=t.pageX-t.target.getBoundingClientRect().x,i=t.pageY-t.target.getBoundingClientRect().y,r=this.origCtx.getImageData(e,i,1,1),a=r.data;this.selectedColor="#".concat(d.rgbToHex(a)),this.execWithKey()}},computed:{origCtx:function(){var t=this.origCanvas;return t.getContext("2d")},origCanvas:function(){return document.getElementById("orig-image-canvas")},dasshokuCtx:function(){var t=this.dasshokuCanvas;return t.getContext("2d")},dasshokuCanvas:function(){return document.getElementById("dasshoku-image-canvas")}}},m=f,p=(i("38b6"),i("2877")),w=Object(p["a"])(m,s,o,!1,null,null,null),A=w.exports,C={name:"App",components:{Main:A}},y=C,x=(i("7faf"),Object(p["a"])(y,a,n,!1,null,null,null)),b=x.exports;r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(b)}}).$mount("#app")},"724e":function(t,e,i){t.exports=i.p+"img/test.1e1d555d.jpg"},"7faf":function(t,e,i){"use strict";var r=i("b8ff"),a=i.n(r);a.a},b8ff:function(t,e,i){},e146:function(t,e){t.exports="data:image/png;base64,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"}});
//# sourceMappingURL=app.3df3d161.js.map