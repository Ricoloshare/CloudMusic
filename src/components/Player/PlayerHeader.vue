<template>
  <header class="header" >
    <div class="header_icon" @click.stop="back()"></div>
    <div class="header_title">
        <h3>{{getsong.name}}</h3>
        <p>{{getsong.ar}}</p>
    </div>
    <div class="header_right"></div>
  </header>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'PlayerHeader', 
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getsong',
      // ... 
	])},
  data:function(){
    return {
      theme: ['theme','theme1','theme2',],
      index: 0
    }
  },
  methods:{
    back(){
      this.$store.dispatch('setFullPlayer',false);
      this.$store.dispatch('setMiniPlayer',true);
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.header{
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    position: relative;
    top:0px;
    left: 0;
    right: 0;
    // z-index: 999;
    justify-content: space-between;
    .header_icon,.header_right{
      width: 84px;
      height: 84px;
      margin-left: 20px;
    }
    .header_icon{
      @include bg_img("../../assets/images/down");
    }
    .header_title{
      height: 150px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color:white;
      @include font_dpr($font_medium);
      padding: 20px 0;
      h3,p{
          margin: 0;
          @include clamp(1);
      }
    }
}
</style>
