<template>
	<div class="myhabits">
    <div class="add-habit">
      <h2 class="myhabits-title">我的挑战</h2>
      <span @click="showContent()"></span>
    </div>
    <ul class='habitlist'>
      <li class="habitlist_title" v-if="showFlag">
        挑战名称：<input type="text" name="habit" v-model="habitName">
        <input type="submit" @click="addhabits" value="确定">
        <input type="reset" @click="cancel" value="取消">
      </li>
      <li class="habitlist-item" v-for="value in this.getHabitsList" :key="value.id">
        <div :class="[value.done == 0 ? 'undone': 'done', 'icondone']" @click="habitDone($event, value)"></div>
        <div class="icontitle">
          <h2>{{value.name}} </h2>
          <h2>共打卡：{{value.days}}天</h2>
        </div>
        <span class="delete" @click="deleteHabit(value.name)"></span>
      </li>  
    </ul>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import Netword from '../../api/netword'

export default {
  name: 'MyHabits',
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getHabitsList',
      // ... 
	])},
	data() {
			return {
        showFlag:false,
        habitName:'',
        isDone:null,
			}
  },
  props: {
    personlist:Array,
    title:String,
    type:String
  },
  methods:{
    ...mapActions([
			'addHabitsList',  
			'setHabitsList',
    ]),
    showContent(){
      this.showFlag = true;
    },
    addhabits(){
      this.showFlag = false;
      if(this.habitName != '' && this.habitName != null){
        for(let i = 0; i < this.getHabitsList.length; i++){
            if(this.habitName == this.getHabitsList[i].name){
              return;
            }
        }
      }
      this.addHabitsList({
        name:this.habitName,
        days:0,
        done:0,
        id: Math.random()*100000
      });
      // Netword.get("hhh");
    },
    cancel(){
      this.showFlag = false;
    },
    deleteHabit(id){
      let arr = [];
      for(let i = 0; i < this.getHabitsList.length; i++){
        if(id != this.getHabitsList[i].name){
          arr.push(this.getHabitsList[i]);
        }
      }
      this.setHabitsList(arr);
    },
    habitDone(e,v){
      v.done++;
      if(v.done == 1)
        v.days++;
    },
    
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.add-habit{
  width: 100%;
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  span{
    width: 64px;
    height: 64px;
    display: block;
    @include bg_img("../../assets/images/add");
  }
  h2{
    height: 84px;
    line-height: 84px;
    padding-left: 20px;
    @include font_color();
    @include font_size($font_medium);
    margin: 0;
  }
}
.add-content{
  width: 200px;
  height: 84px;
}
.habitlist{
		width: 100%;
		border-top-left-radius: 50px;
		border-top-right-radius: 50px;
		margin: 0px;
		@include bg_sub_color();
		@include font_color();
		padding: 0;
		li{
			width: 100%;
			height: 80px;
			padding: 0 20px;
			border-bottom: 1px solid #ccc;
		}
		.habitlist-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include font_size($font_medium_s);
      .icondone{
        width: 60px;
				height: 60px;
				margin-right: 10px;
      }
      .done{
        @include bg_img("../../assets/images/small_done");
      }
      .undone{
        @include bg_img("../../assets/images/small_un_done");
      }
      .delete{
          width: 60px;
				  height: 60px;
          margin-right: 30px;
          margin-top: 5px;
				  @include bg_img("../../assets/images/small_del");
        }
      .icontitle{
        display: flex;
        h2{
          width: 250px;
          @include font_size($font_medium_s);
          margin-right: 20px;
        }
      }
		}
		.habitlist_title{
			display: flex;
			align-items: center;
			@include font_size($font_medium_s);
			input[type="text"]{
        width: 400px;
        height: 60px;
        @include font_color();
        background-color: #333;
        @include font_size($font_medium);
        margin: 0 10px;
        border-radius: 10px;
      }
      input[type="submit"],input[type="reset"]{
        width: 80px;
        height: 60px;
        @include font_size($font_medium);
        margin-left: 10px;
        border-radius: 10px;
      }
		}
	}
</style>
