<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
