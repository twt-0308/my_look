<template>
  <div class="register">
    <login-top middleTop="登录账号">
      <div style="font-size: 3.61vw" slot="right" @click="$router.push('/')">切换注册页面</div>
    </login-top>
    <login-text label="账号"
                rule="^.{6,16}$"
                placeholder="请输入账号"
                @inputChange="(res) => model.username = res"
                style="margin: 4.147vw 0;"
    />
    <login-text label="密码"
                rule="^.{6,16}$"
                placeholder="请输入密码"
                type="password"
                @inputChange="(res) => model.password = res"
    />
    <login-btn btnName="登录" @btnClick="btnClick"/>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginText from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    // 点击了注册
    async btnClick() {
      const rulg = /^\d{7,11}$/
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/login', this.model)
        console.log(res)
        if (res.data.code === 302) return this.$msg.fail(res.data.msg)
        return this.$msg.success(res.data.msg)
      } else {
        this.$msg.fail('格式不正确!')
      }
    }
  }
}
</script>

<style scoped>

</style>
