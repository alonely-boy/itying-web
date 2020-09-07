<template>
  <div class="container">
    <keep-alive include="HomeLeft">
      <router-view></router-view>
    </keep-alive>
    
    
    
    <home-right></home-right>
  </div>
</template>

<script>
import HomeRight from 'components/childs/HomeRight.vue'
export default {
  name: "HomeMain",
  components:{
    
    HomeRight
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.container {
  // margin-top: 10px;
  position: relative;
  // background: red;
  top: 60px;
  width: 1000px;
  min-height: 600px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
}
@media screen and(max-width: 700px){
  .container{
    width: 100%;
    display: block;
  }
}

</style>
