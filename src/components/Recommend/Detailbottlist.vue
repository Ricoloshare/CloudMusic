<template>
	<ul class='bottomlist'>
		<li class="bottomlist_title">
			<div class="iconplay" @click="PlayAll(playdetaillist)"></div>
			<div class="icontitle">播放全部 （共{{length}}首） </div>
		</li> 
		<li class="bottom_item" v-for="value in playdetaillist" :key="value.id" @click="Player(value.id)">
			<h3>{{value.name}}</h3>
			<p>{{value.al.name}}-{{value.ar[0].name}}</p>
		</li>
		
	</ul>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
	name: 'Detailbottom',
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getDetailSong',
	  'getCurrentIndex'
      // ... 
	])},
	props:{
		'playdetaillist':{
			required: true
			},
		length:{
			type: Number,
			default: 10,
			required: true
		}
	},
	methods:{
		...mapActions([
			'setDetailSong',// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			'setFullPlayer',
			'setlyric',
			'setSongUrl',
			'setPlayMode',
			'setSongIndex'
		]),
		Player(id){
			this.setFullPlayer(true);
			this.setPlayMode(true);
			this.setDetailSong([id]);
			this.setSongIndex(0);
		},
		PlayAll(data){
			this.setFullPlayer(true);
			this.setPlayMode(true);
			let id = data.map(value=>{return value.id});
			this.setDetailSong(id);
			this.setSongIndex(0);
		}
	}
}


</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
	.bottomlist{
		width: 100%;
		border-top-left-radius: 50px;
		border-top-right-radius: 50px;
		margin: 0px;
		@include bg_sub_color();
		@include font_color();
		padding: 0;
		li{
			width: 100%;
			height: 100px;
			padding: 0 40px;
			border-bottom: 1px solid #ccc;
		}
		.bottom_item{
			@include font_size($font_medium_s);
			h3{
				@include font_size($font_medium_s);
				padding-top: 10px;
				margin: 10px 0;
			}
			p{
				@include font_size($font_samll);
				@include clamp(1);
				padding-right: 80px;
				margin: 0;
				opacity: 0.5;
			}
		}
		.bottomlist_title{
			display: flex;
			align-items: center;
			justify-content: row;
			@include font_size($font_medium_s);
			.iconplay{
				width: 60px;
				height: 60px;
				margin-right: 10px;
				@include bg_img("../../assets/images/small_play");
			}
		}
	}
</style>