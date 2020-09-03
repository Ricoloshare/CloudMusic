<template>
	<div class="player">
		<NormalPlayer v-show="this.getisFullScreen" :totaltime='totaltime' :currentime='currentime'></NormalPlayer>
		<MiniPlayer v-show="this.getisMiniPlayer"></MiniPlayer>
		<ListPlayer></ListPlayer>
    <audio :src="getSongUrl" ref="audio" @timeupdate="timeupdate" ></audio>
	</div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters , mapActions} from 'vuex'
import {mode} from '../store/mode-type' 
export default {
	name: 'Player',
	components:{
		NormalPlayer,
		MiniPlayer,
		ListPlayer
  },
  methods:{
		...mapActions([
			'setlyric',
      'setSongUrl',
      'setSongIndex'
    ]),
    timeupdate(){
      let index = this.getCurrentIndex;
      this.currentime = this.$refs.audio.currentTime;
      if(this.currentime == 0) return
      if(this.currentime == this.totaltime){
        if(this.getCurrentMode == mode.loop){
          this.$refs.audio.loop = false;
          if(this.getDetailSong.length > 1){
            if(this.getCurrentIndex < this.getDetailSong.length){
              index++;
              this.setSongIndex(index);
            }else{
              this.setSongIndex(0);
            }
          }
        }else if(this.getCurrentMode == mode.shuffle){
          let lastindex = this.getCurrentIndex;
          this.$refs.audio.loop = false; 
          let index = Math.floor(Math.random()*this.getDetailSong.length);
          if(lastindex == index){
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.play();
          }else{
            this.setSongIndex(index);
          }
        }else if(this.getCurrentMode == mode.one){
          this.$refs.audio.loop = true;   
        }
      }
    },
      
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getisFullScreen',
      'getisMiniPlayer',
      'getSongUrl',
      'getisPlayMode',
      'getsong',
      'getCurrentime',
      'getCurrentMode',
      'getDetailSong',
      'getCurrentIndex'
      // ...
    ])
  },
  watch:{
    getisPlayMode(newValue,oldValue){
      if(newValue){
        this.$refs.audio.play();
        this.$refs.audio.autoplay = 'true';
      }else{
        this.$refs.audio.pause();
      }
    },
    getsong(newValue,oldValue){
      if(newValue){
        this.setSongUrl(newValue.id);
        this.setlyric(newValue.id);
      }
    },
    getCurrentime(newValue,oldValue){
      if(newValue){
        this.$refs.audio.currentTime = newValue;
      }
    },
  },
  mounted(){
    this.$refs.audio.oncanplay = () =>{
      this.totaltime = this.$refs.audio.duration;
    }
  },
  data:function(){
    return {
      totaltime:0,
      currentime:0
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

</style>

