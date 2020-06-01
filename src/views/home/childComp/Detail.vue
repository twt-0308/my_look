<template>
  <div>
    <div class="detail">
      <div class="img_parent">
        <img :src="detailitem.img" alt="">
        <div class="bottom">
          <div><span class="video icon-play2">123</span></div>
          <div><span class="comment icon-file-text">{{detailitem.commentlen}}</span></div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailitem']
}
</script>

<style scoped lang="less">
  img {
    width: 100%;
  }
  p {
    font-size: 3.61vw;
  }
  .img_parent {
    position: relative;
    .bottom {
      position: absolute;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 2.78vw;
      box-sizing: border-box;
      bottom: 1.39vw;
      background: linear-gradient(0deg, rgba(0,0,0,.85),transparent);
      color: white;
    }
  }
</style>
