<template>
  <div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="main">
      <h1>404Error</h1>
      <p>您在大学IT营迷路了！</p>
    </div>
  </div>
</template>

<style scoped>
.main{
  /* width: 300px; */
  position: absolute;
  font-size: 28px;
  left: 50%;
  text-align: center;
  top: 50%;
  transform: translate(-50%,-50%);
}
button{background:linear-gradient(#EC5DC1,#D61A6F);padding:0 12px;border:none;border-radius:20px;box-shadow:0 30px 15px rgba(0,0,0,0.15);outline:none;color:#FFF;font:400 16px/2.5 Nunito,'Varela Round',Sans-serif;text-transform:uppercase;cursor:pointer}
.bubble{background:linear-gradient(#EC5DC1,#D61A6F);border-radius:50%;box-shadow:0 30px 15px rgba(0,0,0,0.15);position:absolute}
.bubble:before,.bubble:after{content:'';background:linear-gradient(#EC5DC1,#D61A6F);border-radius:50%;box-shadow:0 30px 15px rgba(0,0,0,0.15);position:absolute}
.bubble:nth-child(1){top:15vh;left:15vw;height:22vmin;width:22vmin}
.bubble:nth-child(1):before{width:13vmin;height:13vmin;bottom:-25vh;right:-10vmin}
.bubble:nth-child(2){top:20vh;left:38vw;height:10vmin;width:10vmin}
.bubble:nth-child(2):before{width:5vmin;height:5vmin;bottom:-10vh;left:-8vmin}
.bubble:nth-child(3){top:12vh;right:30vw;height:13vmin;width:13vmin}
.bubble:nth-child(3):before{width:3vmin;height:3vmin;bottom:-15vh;left:-18vmin;z-index:6}
.bubble:nth-child(4){top:25vh;right:18vw;height:18vmin;width:18vmin}
.bubble:nth-child(4):before{width:7vmin;height:7vmin;bottom:-10vmin;left:-15vmin}
.bubble:nth-child(5){top:60vh;right:18vw;height:28vmin;width:28vmin}
.bubble:nth-child(5):before{width:10vmin;height:10vmin;bottom:5vmin;left:-25vmin}
</style>