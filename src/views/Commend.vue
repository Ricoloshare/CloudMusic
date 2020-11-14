<template>
<transition name="fade">
  <div class="commend">
    <h2>成就达成</h2>
    <div class="wrapper">
        <div class="item">
            <img src="../assets/images/成就.png" class="new">
            <p>新人成就奖</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色1天.png" ref="img1">
            <p>坚持打卡1天</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色3天.png" ref="img3">
            <p>坚持打卡3天</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色7天.png" ref="img7">
            <p>坚持打卡7天</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色15天.png" ref="img15">
            <p>坚持打卡15天</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色30天.png" ref="img30">
            <p>坚持打卡30天</p>
        </div>
        <div class="item">
            <img src="../assets/images/额外任务成就灰色60天.png" ref="img60">
            <p>坚持打卡60天</p>
        </div>
    </div>
  </div> 
</transition>
</template>

<script>

export default {
  name: 'Commend', 
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.commend{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 184px;
  right: 0px;
  left:0px;
  bottom: 0px;
  @include bg_sub_color(); 
  .wrapper{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap; 
    text-align: center;
    align-items: center;
  } 
  
  h2{
      margin-left: 20px;
      @include font_color();
      @include font_size($font_large);
  }
  .item{
    text-align: center;
    margin-left: 20px;
    @include font_color();
    @include font_size($font_medium);
  }
  img{
    width: 220px;
    height: 220px;
  }
  .new{
    width: 200px;
    height: 200px;
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
