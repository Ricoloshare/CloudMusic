<template>
    <div class="tabbar">
        <router-link class="tab" to="/Home"><span>主页</span> </router-link>
        <router-link class="tab" to="/Commend">表彰墙</router-link>
        <router-link class="tab" to="/Mood">心情</router-link>
        <router-link class="tab" to="/Ranker">挑战排名</router-link>
    </div>
</template>

<script>


export default {
    name: 'Tabbar',
    methods:{
        activeTab(){
            console.log(this.$el);
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";

.tabbar{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top:100px;
    // z-index: 999;
    justify-content: space-around;
    .tab{
        @include font_size($font_medium);
        @include font_color();
        text-decoration: none;
    }
    .router-link-active{
        text-decoration: none;
        border-bottom: 5px solid #000;
        @include font_active_color();
        @include border_color();
    }
}
</style>