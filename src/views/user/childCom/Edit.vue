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
    <edit-item left="昵称" @click.native="nameHandle">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-item>
    <div class="line"></div>
    <edit-item left="UID">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-item>
    <div class="line"></div>
    <edit-item left="性别" @click.native="sexHandle">
      <a href="javascript:;" slot="right">{{model.gender === 1 ? '男':'女'}}</a>
    </edit-item>
    <div class="line"></div>
    <edit-item left="个性签名" @click.native="geHandle">
      <a href="javascript:;" slot="right" v-if="model.user_desc">{{model.user_desc}}</a>
    </edit-item>
    <!--  昵称对话框  -->
    <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirmClick">
      <van-field v-model="content" placeholder="请输入昵称"/>
    </van-dialog>
    <!--  个性签名对话框  -->
    <van-dialog v-model="geShow" title="个性签名" show-cancel-button @confirm="personClick">
      <van-field v-model="text" placeholder="请输入个性签名"/>
    </van-dialog>
    <van-action-sheet v-model="action" :actions="actions" @select="onSelect" />
    <login-btn btnName="返回个人中心" @btnClick="$router.push('/user')"/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
import EditItem from './EditItem'
export default {
  data() {
    return {
      model: {},
      // 昵称对话框显示
      show: false,
      content: '',
      geShow: false,
      text: '',
      actions: [
        { name: '男', value: 1 },
        { name: '女', value: 0 }
      ],
      action: false
    }
  },
  components: {
    Navbar,
    EditItem,
    LoginBtn
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
      this.UserUpdate()
    },
    // 修改资料
    async UserUpdate() {
      const { data: res } = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
      if (res.code === 200) return this.$msg.success('修改成功')
    },
    // 管理昵称框显示与隐藏
    nameHandle() {
      this.show = true
    },
    // 点击修改昵称
    confirmClick() {
      if (this.content === '') return
      this.model.name = this.content
      this.UserUpdate()
      this.content = ''
    },
    personClick() {
      this.model.user_desc = this.text
      this.UserUpdate()
      this.text = ''
    },
    // 管理个性签名框显示与隐藏
    geHandle() {
      this.geShow = true
    },
    // 性别框显示
    sexHandle() {
      this.action = true
    },
    // 选择性变
    onSelect(event) {
      this.model.gender = event.value
      this.UserUpdate()
      this.action = false
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
