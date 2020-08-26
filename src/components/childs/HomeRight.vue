<template>
  <div class="right">
      <el-card class="box-card operate" >
        <div class="icon-container">
          <div class="icon-content" @click="writeArticle">
            <svg  width="45px" height="70px" t="1595963096519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2659"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#45ACFE" p-id="2660"></path><path d="M699.4944 198.3488H329.1136c-47.104 0-78.848 38.7072-78.848 85.8112v462.7456c0 47.0016 31.8464 78.848 78.848 78.848h296.8576v-0.8192c69.7344-7.9872 139.0592-79.1552 146.944-157.5936h0.8192V284.0576c0-47.104-27.2384-85.7088-74.24-85.7088z m-79.5648 589.312H609.28v-94.5152c0-11.776 9.5232-21.2992 21.2992-21.2992h104.0384c-10.1376 52.8384-66.6624 115.8144-114.688 115.8144z m115.8144-151.3472H603.2384v0.2048c-14.9504 3.8912-25.2928 14.2336-29.184 29.184h-0.2048v121.856H326.8608c-23.552 0-38.6048-15.0528-38.6048-38.6048V281.8048c0-23.552 15.0528-45.4656 38.6048-45.4656h370.2784c23.552 0 38.6048 21.9136 38.6048 45.4656v354.5088zM619.8272 471.1424H377.2416c-11.1616 0-20.1728 7.7824-20.1728 18.944s9.1136 20.1728 20.1728 20.1728h242.4832c11.1616 0 20.1728-9.1136 20.1728-20.1728 0.1024-11.1616-9.0112-18.944-20.0704-18.944z m0-126.3616H377.2416c-11.1616 0-20.1728 7.7824-20.1728 18.944s9.1136 18.944 20.1728 18.944h242.4832c11.1616 0 20.1728-7.7824 20.1728-18.944 0.1024-11.1616-9.0112-18.944-20.0704-18.944z m0-20.48" fill="#FEFCFC" p-id="2661"></path></svg>
            <div>写文章</div>
          </div>
          <div class="icon-content" @click="star">
            <svg width="45px" height="70px" t="1595964105200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3153"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF6666" p-id="3154"></path><path d="M713.386667 337.92c20.48 0 37.546667 17.066667 37.546666 37.546667v61.44H273.066667v-100.693334c0-20.48 17.066667-37.546667 37.546666-37.546666H563.2c20.48 0 37.546667 17.066667 37.546667 37.546666v1.706667h112.64z" fill="#FFFFFF" p-id="3155"></path><path d="M322.56 385.706667H699.733333c27.306667 0 49.493333 22.186667 49.493334 49.493333v226.986667c0 34.133333-27.306667 63.146667-63.146667 63.146666H336.213333c-34.133333 0-63.146667-27.306667-63.146666-63.146666V436.906667c0-27.306667 22.186667-51.2 49.493333-51.2z m196.266667 233.813333l51.2 18.773333h3.413333c5.12 0 8.533333-3.413333 8.533333-8.533333l-1.706666-52.906667 32.426666-40.96c3.413333-3.413333 1.706667-8.533333-1.706666-10.24 0 0-1.706667-1.706667-3.413334-1.706666l-51.2-13.653334-30.72-44.373333c-3.413333-3.413333-8.533333-5.12-11.946666-1.706667l-1.706667 1.706667-30.72 44.373333-51.2 13.653334c-1.706667 0-1.706667 0-3.413333 1.706666-3.413333 3.413333-3.413333 6.826667-1.706667 10.24l32.426667 40.96-1.706667 52.906667v3.413333c1.706667 3.413333 6.826667 6.826667 10.24 5.12l52.906667-18.773333z" fill="#FFFFFF" p-id="3156"></path></svg>
            <div>收藏夹</div>
          </div>
          <div class="icon-content" @click="edit">
            <svg t="1597240430239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="45" height="70"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#508CEE" p-id="1927"></path><path d="M673.792 362.496l28.672 28.672-141.312 141.312-26.624-2.048-2.048-26.624 141.312-141.312m0-34.816c-4.096 0-10.24 2.048-12.288 4.096L499.712 491.52l8.192 65.536 65.536 8.192 159.744-159.744c8.192-8.192 6.144-22.528-4.096-32.768l-36.864-36.864c-6.144-6.144-12.288-8.192-18.432-8.192z" fill="#FFFFFF" p-id="1928"></path><path d="M696.32 522.24v81.92c0 16.384-14.336 30.72-30.72 30.72H573.44l-61.44 61.44-61.44-61.44h-92.16c-16.384 0-30.72-14.336-30.72-30.72v-204.8c0-16.384 14.336-30.72 30.72-30.72h184.32v-30.72h-184.32c-34.816 0-61.44 26.624-61.44 61.44v204.8c0 34.816 26.624 61.44 61.44 61.44h79.872l53.248 53.248c6.144 6.144 14.336 8.192 22.528 8.192s16.384-2.048 22.528-8.192l53.248-53.248h79.872c34.816 0 61.44-26.624 61.44-61.44v-81.92H696.32z" fill="#FFFFFF" p-id="1929"></path></svg>
            <div>改文章</div>
          </div>
          <div class="icon-content">
            <svg t="1597305672500" @click="fankui" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2421" width="45" height="70"><path d="M512 698.788978H250.311111a22.755556 22.755556 0 0 0 22.755556 22.755555h489.244444a22.755556 22.755556 0 0 0 22.755556-22.755555H512zM512 402.966756a158.72 158.72 0 0 1 47.911822-113.777778H375.466667c-69.12 0-125.155556 56.035556-125.155556 125.155555v238.933334h261.688889v-250.311111z m-91.022222 216.177777H307.2a22.755556 22.755556 0 1 1 0-45.511111h113.777778a22.755556 22.755556 0 1 1 0 45.511111zM664.439467 289.416533c-59.619556 3.527111-106.928356 52.861156-106.928356 113.379556v250.481778h227.555556v-238.933334c0-67.595378-53.623467-122.527289-120.6272-124.928z" fill="#9499E5" p-id="2422"></path><path d="M512 0C229.228089 0 0 229.228089 0 512s229.228089 512 512 512 512-229.228089 512-512S794.771911 0 512 0z m318.577778 653.277867v56.888889a56.888889 56.888889 0 0 1-56.888889 56.888888H557.511111v45.511112a22.755556 22.755556 0 0 1-22.755555 22.755555h-34.133334a22.755556 22.755556 0 0 1-22.755555-22.755555v-45.511112H261.688889a56.888889 56.888889 0 0 1-56.888889-56.888888v-295.822223c0-94.253511 76.413156-170.666667 170.666667-170.666666h284.444444c1.922844 0 3.7888 0.227556 5.688889 0.284444 1.900089-0.068267 3.766044-0.284444 5.688889-0.284444v0.568889c88.928711 5.882311 159.288889 79.678578 159.288889 170.097777v238.933334z" fill="#9499E5" p-id="2423"></path></svg>
            <div>反馈信</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card ">
        <div slot="header" @click="writeCenter" class="clearfix" style="color:#aaa;fontSize:14px;cursor:pointer">
          <span ><svg style="transform: translate(-5px,3px);" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M15.075 15.388l-3.024 3.024a4.041 4.041 0 0 0-1.014 1.697l-.26.868C7.844 20.986 4.91 21 2 21c.026-3.325 0-3.304.59-3.956 1.237-1.368 6.251-.68 6.44-2.976.043-.518-.36-1.06-.725-1.69C6.285 8.87 5.512 2 11.5 2c5.988 0 5.15 7.072 3.246 10.378-.357.62-.795 1.217-.724 1.77.073.571.477.958 1.053 1.24zm5.402 1.672c.523.55.523.646.523 3.94a535.11 535.11 0 0 0-4.434-.028l3.911-3.912zm-7.88 2.699c.111-.37.312-.705.584-.978l4.76-4.76a.291.291 0 0 1 .412 0l1.626 1.626a.291.291 0 0 1 0 .411l-4.76 4.76c-.272.273-.608.474-.978.585l-1.96.588a.219.219 0 0 1-.272-.272l.589-1.96zm9.157-6.742a.839.839 0 0 1 0 1.187l-.94.94a.28.28 0 0 1-.395 0l-1.563-1.563a.28.28 0 0 1 0-.395l.94-.94a.839.839 0 0 1 1.187 0l.771.771z" fill-rule="evenodd"></path></svg>创作中心</span>
          <i style="float: right; padding: 3px 0" type="text" class="el-icon-arrow-right"></i>
        </div>
        <div class="write-center">
          <div style="borderRight:1px solid #ddd">文章数<br><span>{{this.article}}</span></div>
          <div>获赞数<br><span>{{this.agree}}</span></div>
        </div>
      </el-card>
      <el-card class="box-card" style="height:60px">

          <span class="el-icon-s-order" style="color:#0e932e" @click="myClick">站长名片</span>
          <el-button @click="clickItem" style="float: right; padding: 3px 0" type="text">管理模式</el-button>

      </el-card>
      
      <div class="ad">
        <div class="text">广告</div>
        <el-carousel height="200px" trigger="click">
      <el-carousel-item v-for="(item,index) in ad" :key="index">
        <img :src="item.img" alt=""  @click="adClick(item)"></img>
      </el-carousel-item>
    </el-carousel>
    <div class="beian"><span style="marginRight:20px;cursor:pointer;" @click="beian">鲁ICP备2020034399号</span> &copy;2020 大学IT营</div>
      </div>
      
      
      
      
      
      
      
      <el-dialog
      title="管理员登录"
      :visible.sync="dialogFormVisible"
      :modal="false"
      :close-on-click-modal="false"
      :before-close="commentClose"
      width="30%"
    >
      <el-form :model="form" style="height:140px">
        <el-form-item label="管理账号" label-width="70px">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" label-width="70px">
          <el-input show-password  v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="confirm" v-preventClick>确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="反馈信箱"
      :visible.sync="dialogFormVisible2"
      :modal="false"
      :close-on-click-modal="false"
      :before-close="commentClose2"
      
      width="50%"
    >
      <el-form :model="form2" style="height:140px">
        <el-form-item label="反馈内容" label-width="70px">
          <el-input placeholder="报错反馈，排版错乱，个人建议等各种想反馈给站长的都可以写" maxlength="300" minlength="140" :autosize="{ minRows: 4, maxRows: 8 }" show-word-limit type="textarea" v-model="form2.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="confirm2" v-preventClick>确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'HomeRight',
  created(){
    this.fetchData()
    this.fetchAD()
  },
  data(){
    return {
      ad:[],
      agree:'暂无',
      article:'暂无',
      dialogFormVisible:false,
      dialogFormVisible2:false,
      form:{
        userName:'',
        password:''
      },
      form2:{
        content:''
      }
    }
  },
  methods:{
    async fetchAD(){
      const {data} = await this.$http.get('/ad')
      // console.log(data)
      this.ad = data
    },
    beian(){
      window.open('http://beian.miit.gov.cn', '_blank');
    },
    adClick(item){
      window.open(item.link, '_blank');
    },
    myClick(){
      this.$router.push('/article5f38f9ef5c3c0312cc8d6a8d')
    },
    async confirm2(){
      
        const {data} = await this.$http.post('/fankui',this.form2)
        if(data=='ok'){
          this.dialogFormVisible2 = false
          this.$message.success('反馈成功')
        }else{
          this.$message.error('出错了')
        }
      

    },
    fankui(){
      if(!localStorage.token){
        this.$router.push('/login')
      }else{
        this.dialogFormVisible2 = true
      }
    },
    commentClose2(){
      this.form2.userName=""
      this.dialogFormVisible2 = false
    },
    writeCenter(){
      this.$router.push('/editcenter')
    },
    async fetchData(){
      const {data} = await this.$http.get('writedata')
      this.article = data.length
      this.agree = data.sum
    },
    clickItem(){
      if(!localStorage.token){
        this.$router.push('/login')
      }else{
        this.dialogFormVisible = true
      }
    },
    async confirm(){
      const {data} = await this.$http.post('/admin',this.form)
      // console.log(data)
      if(data=="ok"){
        this.$message.success('管理模式已开启，刷新页面可退出')
        this.$store.commit('adminOK')
      }
      this.dialogFormVisible = false
    },
    commentClose(){
      this.form.userName=""
      this.form.password=""
      this.dialogFormVisible = false
    },
    writeArticle(){
      this.$router.push('/write')
    },
    star(){
      this.$router.push('/star')
    },
    edit(){
      this.$router.push('/editcenter')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ad{
  .beian{
    color:#8590a6;
    font-size: 14px;
    cursor:default
  }
  border: 1px solid #eee;
  position: sticky;
  top: 60px;
  height: 204px;
  width: 100%;
  cursor: pointer;
  img{
   height: 100%;
   width: 100%;
  }
  .text{
    z-index: 100;
    font-size: 14px;
    text-align: center;
    background: rgba(0,0,0,0.5);
    width: 40px;
    position: absolute;
    top: 0;
    right: 2px;
    color: white;
  }
}
.el-icon-s-order{
  cursor: pointer;
}
.write-center{
  div{
    float: left;
    text-align: center;
    width: 50%;
    font-size: 13px;
    color: #aaa;
    line-height: 26px;
  }
}
.right {
  display: flex;
  position: relative;
  width: 296px;
  // height: 700px;
  flex-direction: column;
  .el-card {
    width: 100%;
    height: 140px;
    margin-bottom: 10px;
  }
  .icon-container{
    width: 100%;
    height: 100px;
    // background: yellow;
    display: flex;
    justify-content: space-between;
    .icon-content{
      display: flex;
      // flex: 1;
      width: 45px;
      // background: green;
      text-align: center;
      flex-direction: column;
      font-size: 12px;
      cursor: pointer;
      svg{
        display: block;
        fill: currentcolor;
        color:rgb(32, 207, 91)
      }
    }
  }
}
</style>
