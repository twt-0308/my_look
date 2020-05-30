<template>
  <div class="nav_bar">
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <div class="center">
      <span>请输入内容</span>
      <van-icon class="icon" name="search" />
      <p></p>
    </div>
    <div class="right">
      <img src="@/assets/default_img.jpg">
      <div>下载App</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
  .nav_bar {
    display: flex;
    height: 13.89vw;
    background-color: white;
  }
  .logo {
    width: 30vw;
    height: 13.89vw;
    img {
      width: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 6.67vw;
      height: 6.67vw;
    }
    div {
      padding: 1vw 2.78vw;
      background-color: pink;
      margin: 0 1.39vw;
      border-radius: 1.39vw;
      color: white;
      font-size: 4.17vw;
    }
  }
  .center {
    margin-right: 1.39vw;
    position: relative;
    p {
      position: absolute;
      margin: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      height: 6.94vw;
      background-color: #eee;
      width: 100%;
      border-radius: 2.78vw;
    }
    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1.39vw;
      font-size: 4.17vw;
      z-index: 1;
    }
    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      font-size: 3.33vw;
      left: 7vw;
      color: #aaa;
    }
  }
</style>
