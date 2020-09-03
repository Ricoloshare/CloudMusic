<template>
  <div class="recommend">
    <div class="recomend_wrapper">
      <Scrollview>
        <div>
          <Banner :banners = "banner"></Banner>
          <!-- type传递的参数是字符串，不能忘记在""里面还要加'' -->
          <Personalized :personlist = "personlist" title="推荐歌单" @selected="fathergetdetail" :type="'personlist'"></Personalized>
          <Personalized :personlist = "album" title="最新专辑" @selected="fathergetdetail" :type="'album'"></Personalized>
          <Newsong :newsongs = "musics" title="最新音乐"></Newsong>
        </div>
      </Scrollview>
    </div>
    
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>  
</template>

<script>
import {getBanner, getPersonalized, getNewalbum, getNewMusic} from '../api/index'
import Banner from '../components/Recommend/Banner.vue'
import Personalized from '../components/Recommend/Personalized.vue'
import Newsong from '../components/Recommend/Newsong.vue'
import Scrollview from '../components/Scrollview.vue'

export default {
  name: 'Recommend',
  data:function(){
      return {
          banner:[],
          personlist:[],
          album:[],
          musics:[]
      }
  },
  methods:{
    fathergetdetail(id,type){
      this.$router.push({ path: `/recommend/details/${id}/${type}` });
    }
  },
  created(){
      getBanner()
          .then((response) => {
            this.banner = response.data.banners;
          })
          .catch(function (error) {
            console.log(error);
          })
      getPersonalized()
          .then((response) => {
            this.personlist = response.data.result;
          })
          .catch(function (error) {
            console.log(error);
          })
      getNewalbum()
          .then((response) => {
            this.album = response.data.albums.splice(0,6);
          })
          .catch(function (error) {
            console.log(error);
          })
      getNewMusic()
          .then((response) => {
            this.musics = response.data.result;
            
          })
          .catch(function (error) {
            console.log(error);
          })
  },
  components: {
    Banner,
    Personalized,
    Newsong,
    Scrollview
  },
    
}
</script>

<style lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";

.recommend{
  position: fixed;
  top: 184px;
  right: 0px;
  left:0px;
  bottom: 0px;
  @include bg_sub_color();
  // overflow: hidden;
  .recomend_wrapper{
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
  transform: translateX(100%);
  opacity: 0;
}
</style>