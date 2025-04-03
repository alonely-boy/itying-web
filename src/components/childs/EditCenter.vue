<template>
  <div class="contain">
    <el-card class="card" :class="!starlength?'aaa':''">
      <div class="title">创作中心</div>
      <article-item :articlesList="content">
        <template v-slot:default="a">
          <el-button type="primary" style="padding:5px" size="mini" @click.stop="edit(a.data)">编辑</el-button>
          <el-button type="danger" style="padding:5px" size="mini" @click.stop="remove(a.data)">删除</el-button>
        </template>
      </article-item>
    </el-card>
  </div>
</template>

<script>
import ArticleItem from "@/components/public/ArticleItem";
export default {
  name: "EditCenter",
  components: {
    ArticleItem,
  },
  data() {
    return {
      content: [],
      starlength: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async remove(id) {
      this.$confirm("确定要删除整篇文章吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await this.$http.delete(`/edit${id}`);
          if (data == "ok") {
            this.$message.success("删除成功");
          } else {
            this.$message.error("出错了...");
          }
          this.fetchData();
        })
        .catch(() => {});
    },
    async fetchData() {
      const { data } = await this.$http.get("/edit");
      // console.log(data.length)
      this.content = data;
      this.starlength = data.length;
    },
    edit(id) {
      this.$router.push(`/edit${id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.contain {
	 width: 694px;
}
 .contain .card {
	 width: 100%;
}
 .contain .aaa {
	 background: url("~@/assets/img/空空如也.jpg");
	 background-size: cover;
}
 .title {
	 font-size: 24px;
	 font-weight: bold;
	 color: orange;
	 padding-bottom: 20px;
	 border-bottom: 1px solid #eee;
}
 @media screen and (max-width: 700px) {
	 .contain {
		 width: 96vw;
		 min-height: 400px;
		 padding-left: 3vw !important;
	}
}
 
</style>
