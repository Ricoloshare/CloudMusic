<template>
  <div class="singer">
    <Scrollview ref="scrollview">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
          <h3>{{key[index]}}</h3>
          <div class="list-content" v-for="(v) in value" :key="v.id">
            <img v-lazy="v.img1v1Url" />
            <p>{{v.name}}</p>
          </div>
        </li>
      </ul>
    </Scrollview>
    <ul class="nav">
        <li v-for="(value,index) in key" :key="index" @click="tolocal(index)" :class="{'active' :highli == index}">{{value}}</li>
    </ul>
  </div>
</template>

<script>
import { getAllSinger } from "../api/index";
import Scrollview from "../components/Scrollview";
export default {
  name: "Singer",
  methods: {
    activeTab() {
      console.log(this.$el);
    },
    tolocal(index){
        this.highli = index;
        this.$refs.scrollview.Toscrolling(0,this.topList[index],100);
    }
  },
  data: function () {
    return {
      key: [],
      list: [],
      topList:[],
      highli:27,
    };
  },
  watch:{
      list(newValue, oldValue){
          this.$nextTick(()=>{
              let list = this.$refs.group
              for(let i = 0; i < list.length;i++){
                  this.topList.push(-list[i].offsetTop);
              }
          });
      }
  },
  created() {
    getAllSinger()
      .then((res) => {
        this.key = res.key;
        this.list = res.lists;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  components: {
    Scrollview,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer {
  overflow: hidden;
  position: fixed;
  top: 184px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  @include bg_sub_color();
  @include font_size($font_medium);
  .list-wrapper {
    width: 100%;
    list-style-type: none;
    margin: 0px;
    padding: 0;
    .list-group {
      width: 100%;
      h3 {
        width: 100%;
        margin-bottom: 20px;
        padding-left: 30px;
        color:white;
        margin: 0px;
        @include bg_color();
      }
      .list-content {
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        padding: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img {
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}

.nav{
  position: fixed;
  top: 400px;
  right: 20px;
  bottom: 0px;
  width: 10%;
  list-style-type: none;
  li{
    text-align: center;
    @include font_color();  
    @include font_size($font_medium_s);
    &.active{
        color: red;
    }
  }  
}
</style>