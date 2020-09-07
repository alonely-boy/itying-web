<template>
  <div class="contain1">
    <div v-for="(item,index) in articlesList" :key="index" >
      <div class="container1">
        <div class="picture" v-if="item.icon" @click="itemClick(item._id)">
          <img :src="item.icon" alt="???" width="100%" height="100%" />
        </div>
        <div class="title" @click="itemClick(item._id)">{{item.title}}</div>

        <div class="content" @click="itemClick(item._id)">{{item.content | filterHTMLTag}}</div>
        <div class="footer">
          <el-button v-preventClick type="text" class="agree" @click="agreeClick(item._id,index)">
            <svg
              t="1596215621907"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7992"
              width="20"
              height="20"
            >
              <path
                d="M884.875894 423.143253L646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.18247599-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l1e-8 472.171899c0 46.607504 63.516616 63.393819 88.43309799 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.43412199-300.70569 88.434122-390.177444 88.43412199-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253"
                p-id="7993"
              />
              <path
                d="M251.671415 423.299819L109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.30930601 30.36149501 30.309306 30.36149499 30.309306L262.42022301 958.707948c25.68600901 0 25.458835-20.049638 25.458835-20.049638L287.87905801 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819"
                p-id="7994"
              />
            </svg>
            <span>X {{item.agree | agreeFormat}} 赞</span>
          </el-button>
          <div class="category" @click="categoryClick(item.category.value)">{{item.category.value}}</div>
          <div class="writer"><slot name="default" :data="item._id">作者:{{item.writer[0].userName}}</slot></div>
          <div class="time">{{item.time | dateFormat}}</div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "ArtileItem",
  props: { 
    articlesList: {
      type: Array,
    },
  },
  data(){
    return {
      obj:{
        校园生活:'school',
        IT技术:'IT',
        经验分享:'share',
        论坛提问:'question'
      }
    }
  },
  methods: {
   
    async agreeClick(id,index){
      const data = await this.$http.put("/agree",{id:id})
      if(data.data == "已经点赞过了"){
        this.$message.warning(data.data)
      }else{
        this.articlesList[index].agree++
        this.$message.success(data.data);
      }
    },
    itemClick(id) {
      
      this.$router.push(`/article${id}`);
    },
  },
  filters:{
    agreeFormat(value){
      if(value>=1000){
        let a = Math.floor(value/1000)
        return a+' K'
      }
      return value
    }
  }
};
</script>

<style lang="scss" scoped>
.contain1 {
  // overflow: hidden;
  width: 100%;
  // position: relative;
}
.container1 {
  word-break: normal;

  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word;
  // position: absolute;
  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 28px;
    cursor: pointer;
  }
  .title:hover{
    background: #eee;
  }
  .picture {
    float: right;
    cursor: pointer;
    max-width: 110px; //一个max属性就可以控制内部图片自动缩放，学到了
    img {
      max-height: 150px;
    }
    margin-left: 20px;
  }
  .content {
    cursor: pointer;
    overflow: hidden;
    font-size: 13px;
    // line-height: 20px;
    color: #888;
    text-indent: 2em;
    height: 52px;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    // text-overflow: ellipsis;
    margin-top: 6px;
    margin-bottom: 8px;
  }
  .content:hover{
    background: #eee;
    // border: 1px solid black;
  }
  .footer {
    display: inline-flex;
    font-size: 13px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 33.6px;
    line-height: 33.6px;
    .agree {
      cursor: pointer;
      color: #0084ff;
      width: 80px;
      font-weight: bold;
      // height: 30px;
      vertical-align: middle;
      line-height: 30px;
      // text-align: center;
      // word-wrap: none;
      white-space: nowrap;
      color: #0e932e;
      .icon {
        // margin-top: 5px;
        transform: translate(0, 5px);
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
        background-color: rgba(1, 126, 102, 0.08);
        fill: #0e932e;
      }
      .icon:hover {
        fill: white;
        background-color: green;
        color: white;
      }
    }
    .category {
      // cursor: pointer;
      height: 20px;
      line-height: 20px;
      width: 60px;
      text-align: center;
      color: white;
      background: rgb(25, 214, 214);
      border-radius: 2px;
      user-select: none;
      transform: translate(0, 3px);
    }
    .category:hover {
      background: rgba(47, 0, 255, 0.5);
    }
    .writer {
      width: 150px;

      // background: green;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .writer:hover {
      text-decoration: underline;
    }

    .time {
      width: 200px;
       white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
@media screen and(max-width:800px){
  .picture,.category{
    display: none;
  }
  .footer{
    text-align: center;
  }
  .time{
    width: 100px !important;
  }
}
</style>