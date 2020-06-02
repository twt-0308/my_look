<template>
  <div class="comment_item">
    <div class="commentItem" v-for="(item, index) in commentChild" :key="index">
      <div class="userImg">
        <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
        <img src="@/assets/default_img.jpg" alt="" v-else>
      </div>
      <div class="commentContent">
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>此用户无姓名</span>
        </p>
        <div>
          {{item.comment_content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentChild']
}
</script>

<style scoped lang="less">
  .comment_item {
    padding: 0 8.33vw;
  }
  .commentItem {
    display: flex;
    padding: 2.78vw 0;
    .userImg {
      margin-right: 2.78vw;
      img {
        width: 6.94vw;
        height: 6.94vw;
        border-radius: 50%;
      }
    }
    .commentContent {
      flex: 1;
      p {
        display: flex;
        font-size: 3.61vw;
        color: #555;
        justify-content: space-between;
        margin-bottom: 1.39vw;
      }
      div {
        font-size: 3.61vw;
      }
    }
  }
</style>
