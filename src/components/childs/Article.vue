<template>
  <div class="article">
    <el-card class="box-card">
      <div class="user">
        <div class="avatar">
          <img :src="writer.avatar" />
        </div>
        <div class="name">{{writer.userName}}</div>
        <div v-if="$store.state.admin" style="float:right" class="ope">
          <el-button type="text" class="edit" @click="editClick" v-preventClick>
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="text" class="delete" @click="deleteClick" v-preventClick>
            <i class="el-icon-delete"></i>删除
          </el-button>
        </div>
        <div v-else style="float:right" class="ope">
          <el-button type="text" class="agree" @click="agreeClick" v-preventClick>
            <i class="el-icon-caret-top"></i>点赞
          </el-button>
          <el-button type="text" class="star" @click="starClick" v-preventClick>
            <i class="el-icon-star-on"></i>收藏
          </el-button>
        </div>
      </div>
      <div class="title1">{{article.title}}</div>
      <div class="subtitle1">
        <div class="categorys">
          <div class="category">{{article.category.value}}</div>
          <div
            class="category"
            v-for="(item,index) in article.category.children"
            :key="index"
          >{{item}}</div>
        </div>
        <div class="time">发布于 {{article.time | dateFormat}}</div>
      </div>
      <div class="icon" v-if="article.icon">
        <!-- 题图 -->
        <img :src="article.icon" alt />
      </div>
      <div class="content" v-html="article.content"></div>
    </el-card>
    <el-card class="comment-card">
      <div class="path">
        {{article.comment.length}}条评论
        <div class="path-comment">
          <el-button @click="huifu(false)" type="primary">添加评论</el-button>
        </div>
      </div>
      <div class="comment">
        <div class="comment-content" v-for="(item,index) in article.comment">
          <div class="left1">
            <img :src="item.user.avatar" alt width="40px" height="100%" />
          </div>
          <div class="right">
            <div class="content">
              <span class="name">{{item.user.userName}} :</span>
              {{item.content}}
              <div class="footer">
                <div class="huifu" @click="huifu(item,index)">回复</div>·
                <div class="remove" v-if="judge1(item.user._id)" @click="remove(item,index)">删除 ·</div>
                <div class="time">{{item.time | dateFormat}}</div>
              </div>
              <div class="children">
                <div class="class"></div>
                <div v-for="(item2,index2) in item.children" class="item">
                  <span class="name">{{item2.user.userName}} :</span>
                  {{item2.content}}
                  <div class="footer">
                    <div class="huifu" @click="huifu(item2,index)">回复</div>·
                    <div
                      class="remove"
                      v-if="judge2(item.user._id,item2.user._id)"
                      @click="remove(item2,index,index2)"
                    >删除 ·</div>
                    <div class="time">{{item2.time | dateFormat}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 评论区表单 -->
    <el-dialog
      title="添加评论"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="commentClose"
      :width="mobile?'95%':'500px'"
    >
      <el-form :model="comment" :rules="rules" ref="commentForm">
        <el-form-item prop="value">
          <el-input
            maxlength="160"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            show-word-limit
            v-model="comment.value"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="commentClose">取 消</el-button>
        <el-button v-preventClick type="primary" @click="commentClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      mobile:false,
      removeObj: {},
      huifuObj: {},
      dialogFormVisible: false,
      comment: {
        value: "",
      },
      rules: {
        value: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 2,
            message: "内容不少于2个字符",
            trigger: "blur",
          },
        ],
      },
      article: {
        category: { value: "", children: [] },
        comment: [],
      },
      writer: {},
    };
  },
  created() {
    this.test();
    if(window.innerWidth<=700){
      this.mobile=true
        window.scrollTo({
        top: 20,
        behavior: "smooth",
      });
    }else{
      this.mobile =false
    }
    // console.log(this.$route)
  },
  methods: {
    async deleteClick() {
      this.$confirm("确定以管理员的身份强制删除这篇文章?", "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let str = this.$route.path.slice(8);
          const { data } = await this.$http.delete(`/edit${str}`);
          if (data == "ok") {
            this.$message.success("删除成功");
            this.$router.push("/");
          }
        })
        .catch(() => {});
    },
    editClick() {
      let str = this.$route.path.slice(8);
      // console.log(str);
      this.$router.push(`/edit${str}`);
    },
    async agreeClick() {
      const data = await this.$http.put("/agree", { id: this.article._id });
      if (data.data == "已经点赞过了") {
        this.$message.warning(data.data);
      } else {
        this.$message.success(data.data);
      }
    },
    async starClick() {
      const data = await this.$http.put("/star", { id: this.article._id });
      // console.log(data);
      if (data.data == "已经收藏过了") {
        this.$message.warning(data.data);
      } else {
        this.$message.success(data.data);
      }
    },
    //删除权限判断,文章作者>评论者>评论评论者
    judge1(id) {
      // console.log(localStorage.id)
      var a =
        this.$store.state.admin ||
        localStorage.id == this.article.writer._id ||
        localStorage.id == id;
      // console.log(this.$store.state.admin);
      return a;
    },
    judge2(id1, id2) {
      return (
        this.$store.state.admin ||
        localStorage.id == this.article.writer._id ||
        localStorage.id == id1 ||
        localStorage.id == id2
      );
    },
    async test() {
      const res = await this.$http.get(`${this.$route.path}`);
      // console.log(res.data.comment)
      this.article = res.data;
      this.writer = res.data.writer;
      const res2 = await this.$http.post(`/comment`, res.data.comment);
      this.article.comment = res2.data;
      // Object.assign(this.article.comment,res2.data)
      // console.log(this.article);
    },
    huifu(item, index) {
      if (!localStorage.token) {
        this.$router.push("/login");
        return;
      }
      if (!item) {
        // console.log(123);
        this.dialogFormVisible = true;
        this.huifuObj.children = false;
      } else if (item.children) {
        this.dialogFormVisible = true;
        //  this.comment.value = "@" + item.user.userName;
        this.huifuObj.children = true;
        this.huifuObj.index = index;
      } else {
        this.dialogFormVisible = true;
        this.comment.value = "@" + item.user.userName + ": ";
        this.huifuObj.children = true;
        this.huifuObj.index = index;
      }
    },
    async remove(item, index, index2) {
      this.$confirm("确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!item.children) {
            this.removeObj.index = index2;
            this.removeObj.children = true;
            this.removeObj.motherIndex = index;
            this.removeObj.id = item.id;
            this.removeObj.pid = this.article._id;
            this.removeObj.user = localStorage.id;
          } else {
            this.removeObj.index = index;
            this.removeObj.children = false;
            this.removeObj.id = item.id;
            this.removeObj.pid = this.article._id;
            this.removeObj.user = localStorage.id;
          }
          const res = await this.$http.post("/commentdelete", this.removeObj);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.test();
        })
        .catch(() => {});
    },
    commentClick() {
      this.$refs.commentForm.validate(async (valid) => {
        if (valid) {
          // console.log(this.commentTo, this.comment.value);
          let obj = {
            commentTo: this.article._id,
            content: this.comment.value,
            time: new Date().getTime(),
            huifuobj: this.huifuObj,
          };
          await this.$http.put(`/comment`, obj);
          this.test();
          this.commentClose();
        } else {
          return;
        }
      });
    },
    commentClose() {
      this.commentTo = "";
      this.comment.value = "";
      this.huifuObj = {};
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" >



.article {
  display: flex;
  flex-direction: column;
  width: 694px;

  // height: 1500px;
  .box-card {
    width: 100%;
    padding-bottom: 20px;
    .user {
      display: block;
      height: 60px;
      width: 100%;
      // background: blue;
      div {
        display: inline-block;
      }
      .avatar {
        max-width: 60px;
        border-radius: 50%;
        max-height: 60px;
        overflow: hidden;
        float: left;
        margin-right: 20px;
      }
      .name {
        float: left;
        line-height: 60px;
        font-size: 20px;
        color: #007bff;
        font-weight: bold;
      }
      .star {
        // margin-left: 150px;
        float: right;
        // line-height: 60px;
        // justify-content: right;
        color: rgb(255, 145, 0);
        cursor: pointer;
        .el-icon-star-on {
          font-size: 25px;
          transform: translate(0, 2px);
        }
      }
      .edit {
        margin-right: 50px;
        color: #007bff;
      }
      .delete {
        color: red;
      }
      .agree {
        margin-right: 50px;

        // line-height: 60px;
        // justify-content: right;
        color: #0e932e;
        cursor: pointer;
        .el-icon-caret-top {
          font-size: 25px;
          transform: translate(0, 2px);
        }
      }
    }
    .title1 {
      word-wrap: break-word;
      line-height: 30px;
      font-size: 28px;
      font-weight: bold;
      margin: 20px 5px 0 0;
    }
    .subtitle1 {
      margin: 20px 0;
      display: inline-flex;
      width: 500px;
      height: 24px;
      div {
        margin-right: 20px;
      }
      .category {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        // width: 60px;
        text-align: center;
        color: white;
        background: rgb(25, 214, 214);
        border-radius: 2px;
        user-select: none;
      }
      .category:hover {
        background: rgba(47, 0, 255, 0.5);
      }
      .time {
        // display: inline-block;
        color: #888;
      }
    }
    .icon {
      // overflow: hidden;
      // height: 400px;
      // max-width: 350px;
      // max-height: 300px;
      // max-width: 300px;
      // float: left;
      text-align: center;
      position: relative;
      // padding-left: 25%;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    img {
      max-height: 350px;
    }
    .path {
      width: 100%;
      background: #f6f6f6;
    }
    .content {
      line-height: 24px;
      // color: red;
      // letter-spacing: 0.3px;
    }
  }
  .comment-card {
    margin-top: 30px;
    width: 100%;
    .path {
      height: 40px;
      line-height: 40px;
      color: black;
      font-weight: bold;
      font-size: 18px;
    }
    .path-comment {
      width: 140px;
      // display: inline-block;
      // margin-left: 120px;
      float: right;
    }
    .comment {
      padding-left: 5px;
      .comment-content {
        display: inline-flex;
        flex-direction: row;
        margin-top: 20px;
        .left1 {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        .right {
          min-width: 597px;
          padding-left: 15px;
          width: 100%;
          // height: 200px;

          .name {
            font-size: 16px;
            color: #007bff;
            font-weight: bold;
            line-height: 40px;
          }
          .children {
            margin-top: 10px;
            padding: 15px;
            width: 100%;
            // height: 50px;
            background: rgba(240, 240, 240, 0.6);
            .name {
              font-size: 14px;
              color: #007bff;
              font-weight: bold;
              line-height: 20px;
            }
            .item {
              margin-bottom: 24px;
              font-size: 14px;
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      color: #888;
      margin-top: 15px;
      font-size: 13px;
      .huifu {
        cursor: pointer;
      }
      .remove {
        cursor: pointer;
      }
      div {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
.el-textarea {
  font-size: 14px;
}
@media screen and(max-width: 700px) {
  .article {
    width: 97vw !important;
    padding-left: 3vw !important;
  }
  .subtitle1{
    height: 45px !important;
    display: block !important;
    
  }
  .time{
    float:none !important;
    display: block ;
    margin-top: 5px;
    margin-bottom: 5px;
    // width: 100%;
  }
  .title1{
    margin-top: 50px !important;
    width: 100%;
  }
  .ope{
    width: 100%;
    position: relative;
    float: none !important;
    margin: 0;
  }
  .right{
    min-width: 0 !important;
    width: 100%;
  }
}
</style>