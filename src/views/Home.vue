<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <nav-bar></nav-bar>
    <home-main></home-main>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeMain from '@/components/HomeMain.vue'
import NavBar from 'components/NavBar.vue'

export default {
  name: 'Home',
  created(){
  },
  components: {
    // HelloWorld,
    HomeMain,
    NavBar
  }
}
</script>
