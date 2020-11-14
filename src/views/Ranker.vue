<template>
<transition name="fade">
  <div class="ranker">
    <Scrollview ref="scrollview">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value,index) in this.getRankList" :key="index" ref="group">
          <h3>{{key[index]}}</h3>
          <div class="list-content" v-for="(v,i) in value" :key="i" @click="addtoHabit(v)">
            <img :src="v.pic" alt="">
            <p>{{v.name}}</p>
          </div>
        </li>
      </ul>
    </Scrollview>
    <ul class="nav">
        <li v-for="(value,index) in key" :key="index" @click="tolocal(index)" :class="{'active' :highli == index}">{{value}}</li>
    </ul>
  </div>
</transition>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import Scrollview from "../components/Scrollview";

export default {
  name: "Ranker",
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getRankList',
      // ... 
	])},
  methods: {
    ...mapActions([
			'addHabitsList',  
    ]),
    activeTab() {
      console.log(this.$el);
    },
    tolocal(index){
        this.highli = index;
        console.log(this.topList)
        this.$refs.scrollview.Toscrolling(0,this.topList[index],100);
    },
    addtoHabit(v){
      this.addHabitsList({
        name:v.name,
        days:0,
        done:0,
        id: Math.random()*100000
      });
      this.$router.push("/");
    }
  },
  data: function () {
    return {
      key: ["Top","Good","Fine"],
      topList:[],
      highli:0,
    };
  },
  created(){
    this.$nextTick(()=>{
        let list = this.$refs.group
        for(let i = 0; i < list.length;i++){
            this.topList.push(-list[i].offsetTop);
        }
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
.ranker {
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>