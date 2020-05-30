<template>
  <div class="user">
    <navbar/>
    <user-detail :user="model"/>
    <user-article/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import UserDetail from './childCom/UserDetail'
import userArticle from './childCom/userArticle'
export default {
  data() {
    return {
      model: {}
    }
  },
  components: {
    Navbar,
    UserDetail,
    userArticle
  },
  created() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  }
}
</script>

<style scoped>

</style>
