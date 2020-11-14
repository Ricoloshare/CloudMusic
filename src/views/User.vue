<template>
<transition
  :css="false"
  @enter="enter"
  @leave="leave">
  <div class="loadin" ref="uloadin">
    <SubHeader></SubHeader>
    <form action="http://localhost/habit.php" method="get" v-if="success == false">
        <h2>{{flag?"用户登录":"用户注册"}}</h2>
        <p>账号：<input type="text" label = "账号：" name="username" v-model="username"></p>
        <p>密码：<input type="password" label = "密码：" name="password" v-model="password"></p>
        <p><input type="submit" @click.prevent="submitForm" value="登录" ref="loginb">
        <input type="reset"  value="取消"></p>
        <a href="#" @click="regis">{{flag?"点击注册":"已有账号，点击登录"}}</a>
    </form>
    <div class="suss" v-if="success">
      <p >登录成功</p>
      <p><input type="botton"  value="退出" @click="exit"></p>
    </div>
  </div> 
</transition>
</template>


<script>
import Vue from 'vue';
import SubHeader from '../components/SubHeader';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
  export default {
    data() {
      return {
        username:'',
        password:'',
        accounts:[],
        flag: true,
        success:false
      }
     
    },
    created(){
      if(JSON.parse( Vue.$cookies.get('accounts')))
        this.accounts = JSON.parse( Vue.$cookies.get('accounts'));
      if(JSON.parse( Vue.$cookies.get('success')))
        this.success = JSON.parse( Vue.$cookies.get('success'));
    },
    methods: {
      submitForm() {
        if (this.username == null || this.username == '') {
          alert('用户名不能为空!');
        }
        if (this.password == null || this.password == '') {
          alert('密码不能为空!');
        }
        if(this.flag){
          if(this.accounts.length==0){
            alert('账号未注册!');
          }else{
            for(let i = 0; i < this.accounts.length;i++){
              if(this.accounts[i].user == this.username && this.accounts[i].password == this.password){
                alert('登录成功!');
                this.success = true;
                Vue.$cookies.set('success',1);
                this.$router.push('/');
                return;
              }
            }
            alert('账号或密码错误，登录失败!');
          }
        }
        else {
          for(let i = 0; i < this.accounts.length;i++){
            if(this.accounts[i].user == this.username){
              alert('账号已注册!');
              return
            }
          }
          this.accounts.push({
            user:this.username,
            password:this.password,
          });
          this.success = true;
          Vue.$cookies.set('success',1);
          this.$router.push('/');
          Vue.$cookies.set('accounts',JSON.stringify(this.accounts));
          alert('账号注册成功，欢迎'+this.username);
        }
      },
      regis(){
        if(this.flag){
          this.flag = false;
          this.$refs.loginb.value = "注册";
        }else{
          this.flag = true;
          this.$refs.loginb.value = "登录";
        }
      },
      exit(){
        this.success=false;
        Vue.$cookies.set('success',0);
      },
      enter(e,done){
        Velocity(this.$refs.uloadin, "transition.fadeIn", { duration: 500 },function(){
          done();
        })
      },
      leave(e,done){
        Velocity(this.$refs.uloadin, "transition.fadeOut", { duration: 500 },function(){
          done();
        })
      }
    },
    components:{
      SubHeader
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.loadin{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  text-align: center;
}
form{
  text-align: center;
  margin: 30px auto;
  h2{
    @include font_color();
    @include font_size($font_medium);
    margin-bottom: 150px;
  }
}
p{
  @include font_color();
  @include font_size($font_medium);
}
a{
  @include font_color();
  @include font_size($font_medium_s);
}
input[type="text"],input[type="password"]{
  width: 400px;
  height: 60px;
  @include font_color();
  background-color: #333;
  @include font_size($font_medium);
  margin: 0 10px;
  border-radius: 20px;
}
input[type="submit"],input[type="reset"],input[type="botton"]{
  width: 120px;
  height: 60px;
  @include font_size($font_medium);
  border-radius: 20px;
  margin-left: 40px;
}
input[type="reset"]{
  margin-left: 100px;
}
input[type="botton"]{
  margin: 0;
  text-align: center;
}
</style>
