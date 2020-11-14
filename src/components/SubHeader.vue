<template>
  <header class="header">
    <div class="header_left" @click.stop="back()"></div>
    <div class="header_title">我的</div>
    <div class="header_right"></div>
  </header>
</template>

<script>
export default {
  name: 'SubHeader', 
  data:function(){
    return {
      theme: ['theme','theme1','theme2',],
      index: 0
    }
  },
  props:{
      title:String
  },
  methods:{
    back(){
      this.$router.push('/');
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
    position: relative;
    top:0px;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: space-between;
    .header_left,.header_right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header_left{
      @include bg_img("../assets/images/back");
    }
    .header_title{
      line-height: 100px;
      text-align: center;
      color: white;
      @include font_dpr($font_medium);
    }
}
</style>
