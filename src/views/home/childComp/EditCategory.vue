<template>
  <div class="editCategory" v-if="newCat">
    <navbar/>
    <van-divider :style="{ color: '#1a73e8', borderColor: '#1a73e8', padding: '0 16px' }" dashed>现有栏目</van-divider>
    <div class="new-category newcategory">
      <p v-for="(item,index) in newCat" :key="index" @click="delectItem(index)">{{item.title}}</p>
    </div>
    <van-divider :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }" dashed>已删除栏目</van-divider>
    <div class="new-category delcategory">
      <p v-for="(item,index) in delectCat" :key="index" @click="addItem(index)">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
export default {
  data() {
    return {
      newCat: [],
      delectCat: []
    }
  },
  components: {
    Navbar
  },
  methods: {
    async SelectCategory() {
      const res = await this.$http.get('/category')
      this.newCat = res.data
    },
    // 删除栏目
    delectItem(index) {
      if (this.newCat.length < 4) {
        return this.$msg.fail('至少有3个')
      }
      const item = this.newCat.splice(index, 1)
      this.delectCat.push(...item)
    },
    // 添加到现有栏目
    addItem(index) {
      const item = this.delectCat.splice(index, 1)
      this.newCat.push(...item)
    }
  },
  watch: {
    newCat() {
      localStorage.setItem('newCat', JSON.stringify(this.newCat))
      localStorage.setItem('delectCat', JSON.stringify(this.delectCat))
    }
  },
  created() {
    if (localStorage.getItem('delectCat') && localStorage.getItem('newCat')) {
      this.newCat = JSON.parse(localStorage.getItem('newCat'))
      this.delectCat = JSON.parse(localStorage.getItem('delectCat'))
      return
    }
    this.SelectCategory()
  }
}
</script>

<style scoped lang="less">
  .new-category {
    display: flex;
    flex-wrap: wrap;
    p {
      width: 15%;
      padding: 2.78vw;
      text-align: center;
      margin: 1.389vw 1.944vw;
    }
  }
  .newcategory{
    p{
      color:#1a73e8 ;
      border:0.278vw solid #1a73e8;
    }
  }
  .delcategory {
    p {
      color: #ee0a24;
      border: 0.278vw solid #ee0a24;
    }
  }
</style>
