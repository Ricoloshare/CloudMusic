<template>
    <div class="loading" v-if="ishow"> 
        <div class="circle"></div>
        <p>正在加载中....</p>
    </div>
</template>

<script>
export default {
    name:'Loading',
    data:function(){
        return {
            ishow:false
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 250px;
    height: 250px;
    border-radius: 50px;
    text-align: center;
    display:flex;
    align-items: center;
    flex-direction: column;
    @include bg_sub_color();
    .circle{
        margin-top: 30px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border-bottom: 1px solid rgb(219, 57, 17);
        border-top: 1px solid rgb(17, 155, 219);
        border-left: 1px solid rgb(22, 231, 40);
        border-right: 1px solid rgb(231, 199, 18);
        animation: go 1s linear infinite;
    }
    p{
        @include font_color();  
        @include font_size($font_medium_s);
    }
}
@keyframes go {
    from{
        transform: rotate(0deg);
    }to{
        transform: rotate(360deg);
    }
}
</style>
