<template>
  <div class="index" v-if="selectArr">
    <navbar/>
    <div class="hr"></div>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editCategory')"><van-icon name="setting-o" /></div>
      <van-tabs swipeable sticky v-model="active" class="hello">
        <van-tab v-for="(item,index) in selectArr" :key="index" :title="item.title">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          :immediate-check="false"
          finished-text="我也是有底线的"
          @load="onLoad"
        >
          <div class="detail_item">
            <detail class="detail" :detailitem="selectItem" v-for="(selectItem,selectIndex) in item.list" :key="selectIndex"/>
          </div>
        </van-list>
      </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import Detail from './childComp/Detail'
export default {
  data() {
    return {
      // 导航栏数据
      selectArr: [],
      active: 0
    }
  },
  components: {
    Navbar,
    Detail
  },
  created() {
    this.selectCategory()
  },
  activated() {
    if (localStorage.getItem('newCat')) {
      const newCat = JSON.parse(localStorage.getItem('newCat'))
      this.changeSelectArr(newCat)
      this.selectArticle()
    }
  },
  methods: {
    // 请求导航栏数据
    async selectCategory() {
      if (localStorage.getItem('newCat')) return
      const { data: res } = await this.$http.get('/category')
      this.changeSelectArr(res)
      this.selectArticle()
    },
    // 改造selectArr数组数据
    changeSelectArr(data) {
      const arr = data.map((item) => {
        item.list = []
        item.page = 0
        item.loading = false
        item.finished = false
        item.pagesize = 10
        return item
      })
      this.selectArr = arr
      return this.selectArr
    },
    //
    async selectArticle() {
      const category = this.getCategory()
      const res = await this.$http.get('/detail/' + category._id, {
        params: {
          page: category.page,
          pagesize: category.pagesize
        }
      })
      category.list.push(...res.data)
      category.loading = false
      if (res.data.length < category.pagesize) {
        category.finished = true
      }
    },
    getCategory() {
      const category = this.selectArr[this.active]
      return category
    },
    // 下拉加载更多
    onLoad() {
      const category = this.getCategory()
      category.page += 1
      this.selectArticle()
    }
  },
  watch: {
    active() {
      this.selectArticle()
    }
  }
}
</script>

<style scoped lang="less">
  .hr {
    height: 0.28vw;
    background-color: #eee;
  }
  .index {
    font-size: 3.89vw;
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
  .detail_item:after {
    content: '';
    width: 48%;
  }
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      padding: 1.389vw 2.778vw;
      background-color: white;
    }
  }
  /deep/ .van-tab:nth-child(12) {
    padding-right: 5.56vw;
  }
</style>
