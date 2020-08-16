<template>
  <div class="contain">
    <el-card class="card" :class="!starlength?'aaa':''">
      <div class="title" >收藏夹</div>
      <article-item :articlesList="content">
        <template v-slot:default="a">
          <el-button type="danger" size="mini" @click.stop="remove(a.data)">移除</el-button>
        </template>
      </article-item>
    </el-card>
  </div>
</template>

<script>
import ArticleItem from '@/components/public/ArticleItem';
export default {
  name:"Star",
  components:{
    ArticleItem
  },
  data(){
    return {
      content:[
      ],
      starlength:0//为0时显示空空如也背景图片
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    async remove(id){
      this.$confirm("确定要取消收藏吗", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async() => {
            const {data} = await this.$http.delete(`/star${id}`)
            if(data=="ok"){
              this.$message.success('移除成功')
            }
            else{
              this.$message.error('出错了...')
            }
            this.fetchData()
          })
          .catch(() => {});
      
    },
    async fetchData(){
      const {data} = await this.$http.get('/star')
      // console.log(data.length)
      this.content = data
      this.starlength = data.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contain {
  width: 694px;
  .card {
    width: 100%;
  }
  .aaa{
    background: url('~@/assets/img/空空如也.jpg');
    background-size: cover;
  }
}
.title {
  font-size: 24px;
  font-weight: bold;
  // line-height: 60px;
  color: orange;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
</style>
