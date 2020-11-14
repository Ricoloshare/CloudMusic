<template>
<transition name="fade">
  <div class="home">
    <div class="home_wrapper">
      <Scrollview>
        <div>
          <Banner :banners = "banner"></Banner>
          <MyHabits></MyHabits>
        </div>
      </Scrollview>
    </div>
  </div> 
</transition> 
</template>

<script>
import Banner from '../components/HomePage/Banner.vue'
import MyHabits from '../components/HomePage/MyHabits.vue'
import Scrollview from '../components/Scrollview.vue'

export default {
  name: 'Home',
  data:function(){
      return {
        banner:[]
      }
  },
  methods:{
  },
  components: {
    Banner,
    MyHabits,
    Scrollview
  },
    
}
</script>

<style lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";

.home{
  position: fixed;
  top: 184px;
  right: 0px;
  left:0px;
  bottom: 0px;
  @include bg_sub_color();
  // overflow: hidden;
  .home_wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>