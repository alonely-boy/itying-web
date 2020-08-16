<template>
  <div class="left">
    <el-card class="box-card">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item index="/">最新</el-menu-item>
        <el-menu-item index="/school">校园生活</el-menu-item>
        <el-menu-item index="/it">IT技术</el-menu-item>
        <el-menu-item index="/share">经验分享</el-menu-item>
        <el-menu-item index="/question">论坛提问</el-menu-item>
        <el-menu-item index="/hot">热榜</el-menu-item>
        
      </el-menu>
      <!-- 显示内容 -->
      <router-view></router-view>
     
    </el-card>
  </div>
</template>

<script>
import New from './content/New'
export default {
  name: "HomeLeftNew",
  components: {
    New
  },
  data() {
    return {
      
      categories: [
        "new",
        "school",
        "learn",
        "person",
        "share",
        "question",
        "hot",
      ],
      
    };
  },
  destroyed(){
    // console.log('我没了')
  },
  methods: {
    handleSelect(index) {
      // console.log(index);
    },
   
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.left {
  // display: flex;
  width: 694px;
  // max-height: 700px;
  .el-card {
    width: 100%;
  }
}
</style>
