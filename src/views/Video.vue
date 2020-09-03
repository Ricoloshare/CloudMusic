<template>
  <div class="recomVideo">
      <Scrollview>
      <ul class="mvlist">
          <li class='item' v-for="v in mvlist" :key="v.id">
            <div class="imgs" @click.stop="playvideo($event,v.id)" v-show="flag != v.id">
              <span class="play"></span>
              <img :src="v.picUrl" alt="">
            </div>
            <video :src="url" v-if="flag == v.id" autoplay controls></video> 
            <p>{{v.name}}</p>
          </li>
      </ul>
      </Scrollview>
  </div>
</template>

<script>
import {getRecomvideo, getVideoUrl} from '../api/index'
import Scrollview from '../components/Scrollview'
import { mapActions} from 'vuex'

export default {
    name: 'Video',
    components:{
      Scrollview
    },
    data:function(){
      return {
        mvlist:[],
        url:'',
        flag: 0
      }
    },
    methods:{
        ...mapActions([
          'setMiniPlayer',
          'setPlayMode',
        ]),
        playvideo(el,id){
          this.flag = id;
          this.setMiniPlayer(false);
			    this.setPlayMode(false);
          getVideoUrl(id)
          .then((res)=>{
            this.url = res.data.data.url;
            console.log(res.data.data.url);
          })
          .catch((e)=>{
            console.log(e);
          })
        }

    },
    created(){
        getRecomvideo()
          .then((res)=>{
            this.mvlist = res.data.result;
            console.log(res.data.result);
          })
          .catch((e)=>{
            console.log(e);
          })
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";

.recomVideo{
    width: 100%;
    height: 100%;
    position: fixed;
    top:184px;
    left:0px;
    right: 0px;
    bottom: 0px;
    @include bg_sub_color();
    overflow: hidden;
    .mvlist{
      width: 100%;
      margin: 0;
      padding: 20px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 500px;
    }
    .item{
      // width: 100%;
      height: 480px;
      position: relative;
      margin: 0 auto;
      box-sizing: border-box;
      margin-bottom: 10px;
      border-bottom: 3px solid #ccc;
      .imgs{
        position: relative;
        .play{
          display: block;
          width: 84px;
          height: 84px;
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
          @include bg_img('../assets/images/play');
        }
        img{
          width: 713px;
          height: 400px;
        }
      }
      video{
        width: 713px;
        height: 400px;
      }
      p{
        margin: 0px 0px;
        margin-bottom: 10px;
        @include font_size($font_medium);
        @include font_color();
      }
    }
}
</style>
