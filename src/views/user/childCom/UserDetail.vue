<template>
  <div class="user_detail">
    <div class="top_img">
      <img src="@/assets/bannerTop_new.png" alt="">
    </div>
    <div class="user_data">
      <div class="user_img">
        <img :src="user.user_img" alt="" v-if="user.user_img">
        <img src="@/assets/default_img.jpg" v-else/>
      </div>
      <div class="left">
        <div class="top">
          <p>
            <span>0</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span>关注</span>
          </p>
          <p>
            <span>0</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="bottom" @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>
    <div class="person">
      <h2>{{user.name}}</h2>
      <p v-if="user.user_desc">{{user.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有留下</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style scoped lang="less">
  .user_detail {
    background-color: white;
  }
  .top_img {
    height: 27.78vw;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user_data {
    padding-left: 1.39vw;
    display: flex;
    .user_img {
      width: 27.78vw;
      height: 27.78vw;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 5.56vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .left {
      flex: 1;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    height: 27.78vw;
    margin-right: 2.78vw;
    font-size: 3.7vw;
    .top {
      display: flex;
      flex: 1;
      p {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3.5vw;
      }
      p:nth-child(2) {
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
    .bottom {
      border: 1px solid pink;
      margin-bottom: 1.39vw;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.94vw 0;
      color: pink;
    }
  }
  .person {
    padding-left: 1.39vw;
    h2 {
      margin: 0;
    }
    p {
      margin: 1.39vw 0 0 0;
      color: #aaa;
      font-size: 3.89vw;
      padding-bottom: 1.39vw;
    }
  }
</style>
