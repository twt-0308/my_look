<template>
  <div class="order">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
          <img src="@/assets/default_img.jpg" alt="" v-else>
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
          </div>
        </div>
      </div>
      <comment-item :commentChild="item.child"/>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  data() {
    return {
      commentList: []
    }
  },
  components: {
    CommentItem
  },
  created() {
    this.getCommentData()
  },
  methods: {
    async getCommentData() {
      const { data: res } = await this.$http.get('/comment/' + this.$route.params.id)
      this.$emit('lengthselect', res.length)
      this.commentList = this.changeCommentData(res)
    },
    // 改造数据
    changeCommentData(data) {
      function fn(temp) {
        var arr1 = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id === temp) {
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id.toString())
          }
        }
        return arr1
      }
      return fn(null)
    }
  }
}
</script>

<style scoped lang="less">
  .order {
    padding-left: 2.78vw;
    padding-right: 2.78vw;
    > div {
      border-bottom: 0.28vw solid #e7e7e7;
    }
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
