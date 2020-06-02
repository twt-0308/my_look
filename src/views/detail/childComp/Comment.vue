<template>
  <div class="comment">
    <p>
      <span>评论</span>
      <span>(4070)</span>
    </p>
    <div class="commentMyinfo">
      <img :src="userInfo.user_img" alt="" v-if="userInfo">
      <img src="@/assets/default_img.jpg" alt="" v-else>
      <input type="text" placeholder="说点什么吧">
      <button @click="handleClick">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.getUserInfo()
    }
  },
  methods: {
    // 获取id数据
    async getUserInfo() {
      const { data: res } = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.userInfo = res[0]
    },
    // 发表 检验是否登录
    handleClick() {
      if (!this.userInfo && !localStorage.getItem('id') && !localStorage.getItem('token')) {
        return this.$msg.fail('请先登录')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .comment {
    margin-top: 5.78vw;
    padding: 2.78vw;
    p span:nth-child(2) {
      color: #aaa;
      padding-left: 2.39vw;
    }
  }
  .commentMyinfo {
    display: flex;
    margin-top: 2.78vw;
    img {
      width: 6.94vw;
      height: 6.94vw;
      border-radius: 50%;
    }
    input {
      outline: none;
      border: none;
      background-color: #eee;
      border-radius: 6.94vw;
      height: 6.94vw;
      font-size: 3.61vw;
      margin-left: 3.17vw;
      line-height: 6.94vw;
      padding: 0 2.78vw;
    }
    button {
      margin-left: 1.39vw;
      border: 0;
      outline: none;
      border-radius: 3.33vw;
      background-color: pink;
      font-size: 3.2vw;
      color: white;
    }
  }
</style>
