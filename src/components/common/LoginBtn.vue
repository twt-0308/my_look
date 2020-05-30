<template>
  <div class="btn">
    <div class="login_btn" @click="handleClick">
      {{btnName}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['btnName'],
  methods: {
    handleClick() {
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
  .btn {
    padding: 4.167vw 2.778vw;
  }
  .login_btn {
    height: 12.5vw;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
    border-radius: 6.25vw;
  }
</style>
