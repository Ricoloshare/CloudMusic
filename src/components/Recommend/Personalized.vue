<template>
	<div class="personalized">
		<h2 class="personalized-title">{{title}}</h2>
    <div class="personalized-list">
      <div class="item" v-for="value in personlist" :key="value.id" @click="getdetail(value.id)">
        <img v-lazy="value.picUrl" :alt="value.name">
        <p>{{value.name}}</p>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Personalized',
	data() {
			return {
			}
  },
  props: {
    personlist:Array,
    title:String,
    type:String
  },
  methods:{
    getdetail(id){
      this.$emit('selected',id,this.type);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
h2{
  width: 100%;
  height: 84px;
  line-height: 84px;
  padding-left: 20px;
  @include font_color();
  @include font_size($font_medium);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin: 0;
}
.personalized-list{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px 0;
}
.item{
  width: 200px;
  padding-bottom: 10px;
  img{
    width: 100%;
    border-radius: 15px;
  }
  p{
    @include clamp(2);
    @include font_size($font_medium_s);
    @include font_color();
  }
}
</style>
