<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"/>
  </div>
</template>

<style lang="less">
  body {
    padding: 0;
    margin: 0;
    background-color: #f4f4f4;
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
</style>
