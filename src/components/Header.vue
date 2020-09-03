<template>
  <header class="header" @click="changeTheme()">
    <div class="header_left"></div>
    <div class="header_title">小李云音乐</div>
  <div class="header_right"></div>
</header>
</template>

<script>
export default {
  name: 'Head', 
  data:function(){
    return {
      theme: ['theme','theme1','theme2',],
      index: 0
    }
  },
  methods:{
    changeTheme(){
      this.index++;
      if(this.index >=3){
        this.index = 0;
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index]); 
    }
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.header{
    width: 100%;
    height: 100px;
    @include bg_color();
    display: flex;
    position: fixed;
    top:0px;
    left: 0;
    right: 0;
    // z-index: 999;
    justify-content: space-between;
    .header_left,.header_right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header_right{
      @include bg_img("../assets/images/account");
    }
    .header_left{
      @include bg_img("../assets/images/logo");
    }
    .header_title{
      line-height: 100px;
      text-align: center;
      color: white;
      @include font_dpr($font_medium);
    }
}
</style>
