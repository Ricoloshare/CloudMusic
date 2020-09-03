<template>
  <div class="search">
      <div class="sarch-input">
        <img src="../assets/images/search.svg" alt="">
        <input type="text" placeholder="搜索音乐、专辑、歌手" v-tortoise='getsugest' v-model="keywords" @keyup.enter="searchDetail(keywords)">
      </div>
      <ul class="suggest" v-show="keywords != ''" >
        <li v-for="(v,i) in suglist" :key="i" @click="searchDetail(suglist[i])">
          <img src="../assets/images/search.svg" alt="">
          <p>{{v}}</p>
        </li>
      </ul>
      <div class="searwrapper" v-show="songflag">
        <Scrollview>
          <ul class="searchSong">
            <h2>搜索结果</h2>
            <li v-for="v in songlist" :key="v.id" @click=" playsong(v.id)">
              <h3>{{v.name}}</h3>
              <p>{{v.artists[0].name}}</p>
            </li>
          </ul>
        </Scrollview>
      </div>
  </div>
</template>

<script>
import {getSuggestSearch,getSearch} from '../api/index'
import Scrollview from '../components/Scrollview'
import { mapGetters, mapActions} from 'vuex'
export default {
    name: 'Search',
    components:{
      Scrollview
    },
    data:function(){
      return {
        keywords:'',
        suglist:[],
        songlist:[],
        songflag:false
      }
    },
    directives: {
      tortoise: {
        // 指令的定义 节流函数
        inserted: function (el,obj) {
          let flag = true;
          let timerid = null;
          el.addEventListener('input',function(){
            if(!flag) return 
            flag == false;
            timerid && clearInterval(timerid);
            timerid = setTimeout(() => {
              flag = true;
              obj.value();
            }, 500);
            
          })
        }
      }
    },
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
      'getDetailSong',
      'getCurrentIndex'
        // ... 
      ])
    },
    methods: {
      ...mapActions([
        'setDetailSong',// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
        'setFullPlayer',
        'setlyric',
        'setSongUrl',
        'setPlayMode',
        'setSongIndex'
		  ]),
      searchDetail(key){
        this.keywords='';
        this.suglist=[];
        this.songlist=[];
        getSearch(key)
            .then((res)=>{
              this.songlist = res.data.result.songs;
            })
            .catch((e)=>{
              console.log(e);
            })
        this.songflag = true;
      },
      playsong(id){
        this.setFullPlayer(true);
			  this.setPlayMode(true);
			  this.setDetailSong([id]);
        this.setSongIndex(0);
      },
      getsugest(){
        let list = [];
        getSuggestSearch(this.keywords)
          .then((res)=>{
            this.suglist=[];
            list = res.data.result.allMatch;
            list.forEach((v)=>{
              this.suglist.push(v.keyword);
            })
          })
          .catch((e)=>{
            console.log(e);
          })
      }
  },

}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
  .search{
    width: 100%;
    height: 100%;
    position: fixed;
    top:184px;
    left:0px;
    right: 0px;
    bottom: 0px;
    @include bg_sub_color();
  }
  .sarch-input{
    margin: 40px 20px;
    margin-bottom: 0px;
    width: 90%;
    height: 60px;
    border-radius: 30px;
    display:flex;
    align-items: center;
    background: #DDD;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    [type="text"]{
      @include font_size($font_medium);
      width: 80%;
      height:100%;
      border: none;
      outline: none;
      background:transparent;
    }
  }
  .suggest{
    position: fixed;
    top:284px;
    right: 0;
    left: 0;
    z-index: 9;
    padding: 0px;
    list-style-type: none;
    margin: 0px 20px;
    width: 90%;
    @include bg_sub_color();
    // border-top: 1px solid #ccc;
    li{
      height: 60px;
      display:flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
        margin-left: 20px;
      }
      p{
        margin: 0px;
        @include font_size($font_medium);
        @include font_color();
      }
    } 
  }
  .searwrapper{
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      @include font_size($font_medium);
      .searchSong{
        padding: 0px;
        list-style-type: none;
        @include font_size($font_medium_s);
        padding-left: 20px;
        padding-bottom: 500px;
        h2{
        margin: 20px 0px;
        padding: 0;
        @include font_size($font_medium);
        }
        li{
          height: 100px;
          display:flex;
          align-items: center;
          flex-direction: column;
          border-bottom: 1px solid #ccc;
        }
        h3,p{
          width: 100%;
          margin: 0;
          padding: 0;
        }
      }
    } 
</style>