<template>
  <div id="app">
    <h1><span id="logo-highlight">D</span>asshoku</h1>
    <Main />
    <footer id="copyright">Created by <a href="https://twitter.com/VienosNotes">@VienosNotes</a>, <a href="https://github.com/VienosNotes/Dasshoku">Github</a> </footer>
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

#logo-highlight
  color Orange

#copyright
  margin 20px
  font-size small
  color darkgray

#copyright a
  color gray
</style>
