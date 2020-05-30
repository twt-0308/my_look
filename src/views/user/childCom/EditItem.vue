<template>
  <div class="edit_item">
    <div class="info">
      <span class="right">{{left}}</span>
      <span class="left"><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['left', 'right']
}
</script>

<style scoped>
  .info {
    padding: 4vw;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
