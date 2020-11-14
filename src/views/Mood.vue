<template>
<transition name="fade">
  <div class="mood">
      <div class="edit">
        <textarea name="content" v-model="textpage" cols="30" rows="10" placeholder='记录坚持的心情'></textarea>
        <span @click="upContent" class="submit">提交</span>
      </div>
      <h2>我的心情</h2>
      <div class="scrwa">
        <Scrollview>
          <ul class="contentlist">
            <li v-for="v in contents" :key="v.id">
              <p>{{v.page}}</p>
              <p class="timeNow">{{v.time}} <span class="delicon" @click="delmeg(v.id)"></span></p>
            </li>
          </ul>
        </Scrollview>
      </div>
  </div>
</transition>
</template>

<script>
import Scrollview from '../components/Scrollview'
import Vue from 'vue'
import { mapActions} from 'vuex'

export default {
    name: 'Mood',
    components:{
      Scrollview
    },
    data:function(){
      return {
       contents:[],
       textpage:"",
      }
    },
    created(){
      if(JSON.parse( Vue.$cookies.get('mood')) != null)
        this.contents = JSON.parse( Vue.$cookies.get('mood'));
    },
    methods:{
      upContent(){
        if(this.textpage != '' && this.textpage != null){
          let now = new Date();
          let content = {};
          content.id = now.getTime();
          content.page = this.textpage;
          let months = now.getMonth() + 1;
          content.time = `${now.getFullYear()}-
          ${months.toString().padStart(2,'0')}-
          ${now.getDate().toString().padStart(2,'0')}  
          ${now.getHours().toString().padStart(2,'0')}:
          ${now.getMinutes().toString().padStart(2,'0')}:
          ${now.getSeconds().toString().padStart(2,'0')}`;
          this.contents.unshift(content);
          this.textpage='';
          Vue.$cookies.set('mood',JSON.stringify(this.contents));
        }
      },
      delmeg(v){
        let arr = [];
        for(let i = 0; i < this.contents.length; i++){
          if(v != this.contents[i].id){
            arr.push(this.contents[i]);
          }
        }
        this.contents = arr;
        Vue.$cookies.set('mood',JSON.stringify(this.contents));
      }
    },
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";

.mood{
    width: 100%;
    height: 100%;
    position: fixed;
    top:184px;
    left:0px;
    right: 0px;
    bottom: 0px;
    box-sizing: border-box;
    @include bg_sub_color();
    overflow: hidden;
    .edit{
      width: 100%;
      height: 450px;
      display: flex;
      flex-direction: column;
      text-align: center;
      position: relative;
      textarea{
        width: 90%;
        margin: 10px auto;
        height: 300px;
        display: block;
        background-color: #333;
        padding: 20px 5px;
        @include font_color();
        @include font_size($font_medium);
      }
      .submit{
        width: 100px;
        height: 50px;
        display: block;
        position: absolute;
        right:20px;
        top:370px;
        background-color: rgba(255, 251, 0, 0.829);
        @include font_color();
        @include font_size($font_medium);
      }
    }
    .scrwa{
      width: 100%;
      height:1000px;
      overflow: hidden;
    }
    h2{
       @include font_color();
       @include font_size($font_medium);
       margin-left: 40px;
    }
    .contentlist{
      width: 100%;
      margin:0;
      padding: 0;
      padding-bottom: 300px;
      border-top: 2px solid #888;
      li{
        width: 100%;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        justify-content: space-between;
        box-sizing: border-box;
        border-bottom: 2px solid #888;
        p{
          width: 90%;
          margin-top:20px;
          word-wrap: break-word; 
          word-break: break-all;
          @include font_color();
          @include font_size($font_medium);
        }
        .timeNow{
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .delicon{
            width: 60px;
            height: 60px;
            display: inline-block;
            @include bg_img("../assets/images/small_del");
          }
        }
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
