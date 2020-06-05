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
          <div @click="collectionClick" :class="{ active: flag }">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div @click="subscriptClick" :class="{ active: guanzhu }">
            <span class="icon-bubble"></span>
            <span>关注</span>
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
    <comment :leng="lens" @sendComment="sendComment" ref="commentRef"/>
    <!--  评论  -->
    <order-comment ref="orderRef" @lengthselect="res => lens = res" @huifuHandle="huifuHandle"/>
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
      commend: [],
      lens: null,
      postCom: {
        comment_content: '',
        comment_date: '',
        article_id: null,
        comment_id: null,
        parent_id: null
      },
      flag: false,
      guanzhu: false
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
    this.collectionInit()
  },
  methods: {
    // 获取点击视屏
    async getArticleData() {
      const { data: res } = await this.$http.get('/article/' + this.$route.params.id)
      this.articleData = res[0]
      if (this.articleData) {
        this.subscriptInit()
      }
    },
    // 获取推荐视屏
    async CommendData() {
      const res = await this.$http.get('/commend')
      this.commend = res.data
    },
    // 发送评论
    async sendComment(str) {
      const date = new Date()
      const m = date.getMonth() + 1
      const d = date.getDate()
      const day = `${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
      this.postCom.comment_date = day
      this.postCom.comment_content = str
      this.postCom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.postCom)
      if (result.status !== 200) return this.$msg.fail('发表失败')
      this.$msg.success('发表成功')
      this.$refs.orderRef.getCommentData()
      this.postCom.parent_id = null
    },
    huifuHandle(id) {
      this.$refs.commentRef.focus()
      this.postCom.parent_id = id
    },
    // 收藏文章
    async collectionClick() {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) return this.$msg.fail('请先登录')
      const res = await this.$http.post('/collection/' + localStorage.getItem('id'), { article_id: this.$route.params.id })
      if (res.data.code === 200 && res.data.msg === '收藏成功') {
        this.flag = true
      } else {
        this.flag = false
      }
      this.$msg.success(res.data.msg)
    },
    // 进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        this.flag = res.data.success
      }
    },
    // 点击关注
    async subscriptClick() {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) return this.$msg.fail('请先登录')
      const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), { sub_id: this.articleData.userid })
      if (res.data.msg === '关注成功') {
        this.guanzhu = true
      } else {
        this.guanzhu = false
      }
      this.$msg.fail(res.data.msg)
    },
    // 进入页面获取是否关注
    async subscriptInit() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.articleData.userid
          }
        })
        this.guanzhu = res.data.success
      }
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
  .active {
    color: pink;
  }
</style>
