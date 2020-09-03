<template>
  <div class="detail">
    <SubHeader :title='name'></SubHeader>
    <img :src="picurl" ref="detillimg">
    <div class="detaillist">
      <Scrollview ref="myscroll">
      <Detailbottom :playdetaillist='playlist' :length='length' ></Detailbottom>
      </Scrollview>
    </div>
  </div> 
</template>

<script>
import SubHeader from '../components/Recommend/SubHeader'
import Detailbottom from '../components/Recommend/Detailbottlist'
import {getPlaylistdetail, getAlbum} from '../api/index'
import Scrollview from '../components/Scrollview.vue'
export default {
  name: 'Playlistdetail', 
  data:function(){
    return {
      name:'',
      picurl:'',
      playlist:{},
      length: 10
    }
  },
  components: {
    SubHeader,
    Detailbottom,
    Scrollview
  },
  created(){
    if(this.$route.params.type === "personlist"){
      getPlaylistdetail(this.$route.params.id)
      .then((response) => {
        let list = response.data.playlist;
        this.name = list.name;
        this.picurl = list.coverImgUrl;
        this.playlist = list.tracks;
        this.length =list.trackIds.length;
      })
      .catch(function (error) {
        console.log(error);
      })
    }else{
      getAlbum(this.$route.params.id)
      .then((response) => {
        
        this.picurl = response.data.album.picUrl;
        this.name = response.data.album.name;
        this.playlist = response.data.songs;
        this.length =this.playlist.length;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
  },
  mounted(){
    this.$refs.myscroll.scrolling(
      (offsetY)=>{
         let defaultHeight = this.$refs.detillimg.offsetHeight;
        if(offsetY > 0){   
          let scale = 1 + offsetY/defaultHeight;
          this.$refs.detillimg.style.transform = `scale(${scale})`;
        }else{
          let scale = 30* Math.abs(offsetY)/defaultHeight;
          this.$refs.detillimg.style.filter = `blur(${scale}px)`;
        }
      }
    )
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  img{
    width: 100%;
    height: 500px;
  }
  .detaillist{
    width: 100%;
    height:300px;
    position: fixed;
    top:500px;
    right:0px;
    left:0px;
  } 
}
</style>
