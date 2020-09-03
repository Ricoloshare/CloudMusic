<template>
    <div class="tabbar">
        <router-link class="tab" to="/recommend"><span>推荐</span> </router-link>
        <router-link class="tab" to="/singer">歌手</router-link>
        <router-link class="tab" to="/video">视频</router-link>
        <router-link class="tab" to="/search">搜索</router-link>
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