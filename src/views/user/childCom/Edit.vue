<template>
  <div class="edit">
    <div class="navbar"><navbar/></div>
    <div class="upload">
      <van-uploader class="load" preview-size="100vw" :after-read="afterRead" />
      <edit-item left="头像">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img"/>
        <img src="@/assets/default_img.jpg" alt="" slot="right" v-else/>
      </edit-item>
    </div>
    <div class="line"></div>
    <edit-item left="昵称">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-item>
    <div class="line"></div>
    <edit-item left="UID">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-item>
    <div class="line"></div>
    <edit-item left="性别"></edit-item>
    <div class="line"></div>
    <edit-item left="出生日期"></edit-item>
    <div class="line"></div>
    <edit-item left="个性签名">
      <a href="javascript:;" slot="right" v-if="model.user_desc">{{model.user_desc}}</a>
    </edit-item>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import EditItem from './EditItem'
export default {
  data() {
    return {
      model: {}
    }
  },
  components: {
    Navbar,
    EditItem
  },
  created() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    // 上出图片
    async afterRead(file) {
      const formdata = new FormData()
      formdata.append('file', file.file)
      const res = await this.$http.post('/upload', formdata)
      this.model.user_img = res.data.url
    }
  }
}
</script>

<style scoped lang="less">
  .navbar {
    margin-bottom: 4.17vw;
  }
  .line {
    height: 0.28vw;
    background-color: #eee;
  }
  .edit a {
    text-decoration: none;
    color: black;
  }
  .edit img {
    width: 12.78vw;
    height: 12.78vw;
    border-radius: 50%;
  }
  .upload {
    position: relative;
    overflow: hidden;
    .load {
      position: absolute;
      opacity: 0;
    }
  }
</style>
