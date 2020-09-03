<template>
  <div id="app">
    <Head></Head>
    <Tabbar></Tabbar>
    <keep-alive include="Singer">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>

import Head from "./components/Header.vue";
import Tabbar from "./components/Tabbar.vue";
import Player from "./views/Player.vue";

export default {
  name: 'APP',
  components: {
    Head,
    Tabbar,
    Player,
  },
}
</script>
<style scoped lang="scss">
@import "assets/css/variable.scss";
@import "assets/css/mixin.scss";


</style>
