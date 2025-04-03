<template>
  <div class="contain">
    
    <article-item :articlesList="content"></article-item>
     <el-pagination
     style="marginTop:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="queryInfo.pagesize"
      :layout="layout"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>


import ArticleItem from '@/components/public/ArticleItem';
export default {
  components:{
    ArticleItem
  },
  data(){
    return {
      layout:'total,sizes, prev, pager, next, jumper',
      total:0,
      queryInfo: {
      // 当前页数
      pagenum: 1,
      // 每页显示多少数据
      pagesize: 5,
    },
      content:[]
    }
  },
  created(){
    this.fetchData()
    // console.log(window.outerWidth)
    if(window.outerWidth <=700){
      this.layout='total,prev,next, jumper'
    }
  },
  methods:{
        // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.fetchData()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      if (window.innerWidth <= 700) {
        window.scrollTo({
          top: 30,
          behavior: "smooth",
        });
      }
      this.queryInfo.pagenum = newSize
      this.fetchData()
    },
    async fetchData(){
      const {data} = await this.$http.get('/',{params:this.queryInfo})
      // console.log(data)
      this.content = data.result
      this.total = data.total
    }
  }
}
</script>

<style lang="css" scoped>

</style>