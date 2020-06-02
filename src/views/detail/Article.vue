<template>
  <div v-if="articleData" class="article">
    <navbar/>
    <div class="detailInfo">
      <div class="video">
        <video :src="articleData.content" controls></video>
      </div>
      <div class="text">
        <div class="title">
          <span>{{articleData.category.title}}</span>
          <span>{{articleData.name}}</span>
        </div>
        <div class="date">
          <span>{{articleData.userinfo.name}}</span>
          <span>146.2万次观看</span>
          <span>5281弹幕</span>
          <span>{{articleData.date}}</span>
        </div>
        <div class="bottom">
          <div>
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div>
            <span class="icon-box-add"></span>
            <span>缓存</span>
          </div>
          <div>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </div>
        </div>
      </div>
      <div class="detail_item">
        <detail class="detail" :detailitem="selectItem" v-for="(selectItem,selectIndex) in commend" :key="selectIndex"/>
      </div>
    </div>
    <!--  发表  -->
    <comment/>
    <!--  评论  -->
    <order-comment/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import Detail from '@/views/home/childComp/Detail'
import Comment from './childComp/Comment'
import OrderComment from './childComp/OrderComment'
export default {
  data() {
    return {
      articleData: null,
      commend: []
    }
  },
  components: {
    Navbar,
    Detail,
    Comment,
    OrderComment
  },
  created() {
    this.getArticleData()
    this.CommendData()
  },
  methods: {
    // 获取点击视屏
    async getArticleData() {
      const { data: res } = await this.$http.get('/article/' + this.$route.params.id)
      this.articleData = res[0]
    },
    // 获取推荐视屏
    async CommendData() {
      const res = await this.$http.get('/commend')
      this.commend = res.data
    }
  },
  watch: {
    $route() {
      this.getArticleData()
      this.CommendData()
    }
  }
}
</script>

<style scoped lang="less">
  .article {
    background-color: white;
  }
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .text {
    background-color: white;
    padding: 2.78vw 4vw;
    .title {
      font-size: 4.33vw;
      span:nth-child(1) {
        padding: 0 2.78vw;
        color: #fb7299;
        background-color: #f4f4f4;
        border-radius: 2.78vw;
      }
    }
    .date {
      padding: 2.78vw 2.28vw;
      span {
        font-size: 3.33vw;
        color: #aaa;
        padding-right: 1.39vw;
      }
      span:nth-child(1) {
        font-size: 4vw;
        color: black;
        padding-right: 2.78vw;
      }
    }
    .bottom {
      display: flex;
      padding: 0 2.28vw;
      div {
        margin-right: 4.17vw;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-size: 5vw;
          padding-right: 1.39vw;
        }
        span:nth-child(2) {
          font-size: 3.61vw;
        }
      }
    }
  }
  .detail_item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detail {
      width: 48%;
      margin: 1.39vw 0;
    }
  }
</style>
