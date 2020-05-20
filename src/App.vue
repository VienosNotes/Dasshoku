<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <h1><span id="logo-highlight">D</span>asshoku</h1>
    <Main />
    <div id="caption">このアプリはブラウザ上のみで動作するため、画像がサーバにアップロードされたりはしません。保存する場合は右クリックからどうぞ。</div>
    <footer id="copyright">Dasshoku v0.1, Created by <a href="https://twitter.com/VienosNotes">@VienosNotes</a>, <a href="https://github.com/VienosNotes/Dasshoku">Github</a> </footer>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Oswald:wght@300&display=swap')

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color Gray
  font-family 'Oswald', sans-serif

h1
  font-family 'Amatic SC', cursive
  font-size 70px
  margin 0

  @media screen and (max-width: 1500px)
    font-family 'Amatic SC', cursive
    font-size 40px
    margin 0


#logo-highlight
  color Orange

#copyright
  margin 10px
  font-size small
  color darkgray

  @media screen and (max-width: 1500px)
    font-size x-small


#copyright a
  color gray

#caption
  color darkgray
  font-size small
  @media screen and (max-width: 1500px)
      font-size x-small
</style>
