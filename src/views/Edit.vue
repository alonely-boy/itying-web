<template>
  <div class="container">
    <nav-bar :subtitle="'写文章'"></nav-bar>
    <div class="content">
      <div class="help">
        <el-button type="text" @click="dialogVisible = true">帮助</el-button>
        <el-dialog title="帮助" :modal="false" :visible.sync="dialogVisible" :width="mobile?'95%':'50%'">
          <div>
            <ul style="color:#e83e8c">
              <li>当你切换页面时，草稿会存到浏览器缓存里 (并不保险)</li>
              <br />
              <li>文章标题为2-30个字</li>
              <br />
              <li>文章二级分类（可选）为自定义标签，最多定义4个</li>
              <br />
              <li>题图（可选）图片会展示在首页右侧缩略图和文章开头</li>
              <br />
              <li>所有图片建议比例为2:3至3:2之间，大小不能超过2MB</li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="xieyi">
        <el-button type="text" @click="dialogVisible1 = true">用户协议</el-button>
        <el-dialog title="用户协议" :modal="false" :visible.sync="dialogVisible1" :width="mobile?'95%':'50%'">
          <div>
            <ul style="color:#e83e8c">
              <li>用户不得发布色情，暴力等各种法律禁止的内容</li>
              <br />
              <li>用户在本站发布的文章，管理者有权力建议修改，修改，删除其中内容，使得文章符合规范</li>
              <br />
              <li>转载等文章需符合转载规范</li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-form :label-position="mobile?'top':'left'" :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="form.category.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-tag
            :key="index"
            v-for="(tag,index) in form.category.children"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            :disabled="form.category.children.length==4"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="添加题图">
          <el-upload
            class="avatar-uploader"
            action="http://81.70.59.91:3000/server/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.icon" :src="form.icon" class="useravatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content" label-width="80px">
          <vue-editor  useCustomImageHandler @image-added="handleImageAdded" v-model="form.content"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button @click="cancle" style="float:right">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import NavBar from "components/NavBar.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "Write",
  data() {
    return {
      mobile:false,
      dialogVisible: false,
      dialogVisible1: false,
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "标题长度为2-30个字符",
            trigger: "blur",
          },
        ],
        category: [
          { required: true, message: "请选择文章分类", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
          { min: 15, message: "文章内容不少于15个字", trigger: "blur" },
        ],
      },
      options: [
        { value: "IT技术", label: "IT技术" },
        { value: "校园生活", label: "校园生活" },
        { value: "经验分享", label: "经验分享" },
        { value: "论坛提问", label: "论坛提问" },
      ],
      inputVisible: false,
      inputValue: "",
      form: {
        category: { value: "IT技术", children: [] },
        title: "",
        content: "",
        icon: "",
      },
      logined: true,
    };
  },
  methods: {
    cancle() {
      this.$confirm("确定清空当前内容和草稿?", "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.icon = "";
          localStorage.form = "";
          this.$refs.ruleForm.resetFields();
        })
        .catch(() => {});
    },
    handleClose(tag) {
      this.form.category.children.splice(
        this.form.category.children.indexOf(tag)
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.category.children.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleAvatarSuccess(res) {
      this.form.icon = res.url;
    },
    async fetchData() {
      if (!this.$store.state.admin) {
        const { data } = await this.$http.get(`${this.$route.path}`);
        this.form = data;
      } else {
        const { data } = await this.$http.put(`${this.$route.path}`);
        this.form = data;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 <= 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //提交按钮
    async onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        this.$confirm("确定发布?", "确认操作", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            this.form.time = new Date().getTime();
            const res = await this.$http.post(`${this.$route.path}`, this.form);
            this.$message.success("修改成功");
            this.form.icon = "";
            localStorage.form = "";
            this.$refs.ruleForm.resetFields();
            this.$router.push("/");
          })
          .catch(() => {});
      });
    },
    //富文本编辑器添加图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      if (file.size >= 2.2 * 1024 * 1024) {
        this.$message.error("图片大小不能超过2MB");
        return;
      } else if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png"
      ) {
        this.$message.error("图片必须是JPG或者PNG格式");
      } else {
        const formData = new FormData();
        formData.append("file", file);

        const res = await this.$http.post("upload", formData);

        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      }
    },
  },
  components: {
    NavBar,
    VueEditor,
  },
  created(){
    
    if(window.innerWidth<=700){
      this.mobile=true
      this.$message.warning('不建议在移动端发布或者修改文章')
    }else{
      this.mobile = false
    }
    this.fetchData()
  },
  mounted() {
    if (localStorage.form) {
      this.form = JSON.parse(localStorage.form);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.form.title || this.form.content)
      window.localStorage.setItem("form", JSON.stringify(this.form));
    next();
  },
};
</script>

<style lang="scss" scoped>
.help {
  position: absolute;
  right: 10px;
  top: 5px;
  color: rgb(33, 145, 179);
  font-size: 20px;
}
.xieyi {
  position: absolute;
  left: 10px;
  top: 5px;
  color: rgb(33, 145, 179);
  font-size: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.content {
  border-radius: 10px;
  position: absolute;
  margin-top: 75px;
  width: 834px;
  // height: 300px;
  background: rgb(255, 255, 255);
  left: 50%;
  transform: translate(-50%);
  .el-form-item {
    padding: 0 50px 0 20px;
    margin-top: 35px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.useravatar {
  max-width: 178px;
  max-height: 178px;
}
@media screen and(max-width:700px){
  .content{
    width: 95vw;
  }
}
</style>