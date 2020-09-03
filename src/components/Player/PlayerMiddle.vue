<template>
	<swiper :options="swiperOptions" class="playermiddle" ref="swiper">
    	<swiper-slide class="cover">
			<div class="coverimg" ref="cdimgs">
				<img ref="coverimages" :src="this.getsong.picUrl" >
			</div>
			<p>{{this.getlyric[currentlyr]}}--{{currentlyr}}</p>
		</swiper-slide> 
		<swiper-slide class="iyrics" ref="lyric">
			<Scrollview ref="scrollview">
			<ul class="iyrics_wapper">
				<li v-for="(value,index) in this.getlyric" :key="index" :class="{'active' :currentlyr===index}">{{value}}</li>
			</ul>
			</Scrollview>
	</swiper-slide> 
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>  
</template>

<script>
import Scrollview from '../Scrollview.vue'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'

export default {
	name: 'PlayerMiddle',
	components: {
    Swiper,
		SwiperSlide,
		Scrollview
	  },
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getisPlayMode',
	  'getsong',
	  'getlyric',
	  'getCurrentime'
      // ... 
    ])},
	data() {
		return {
			swiperOptions: {
				loop: true,
			// If we need pagination
				pagination: {
						el: '.swiper-pagination',
						bulletClass : 'my-bullet',//可以查看手册，按钮设置自己的类名，因为要全局设置样式才行，防止干扰，需设置.my-bullet样式
						bulletActiveClass: 'my-bullet-active'
					},
				observer: true,
				observeParents: true,
				observeSlideChildren: true
			},
			currentlyr:'0'
		}
  },
  watch:{
		getisPlayMode(Newvalue,Oldvalue){
			if(Newvalue){
				this.$refs.cdimgs.classList.add('active');
			}else{
				this.$refs.cdimgs.classList.remove('active');
			}
		},
		getlyric(Newvalue,Oldvalue){
			if(Newvalue){
				this.currentlyr = Object.keys(Newvalue)[0];
			}
		},
		currentime(Newvalue,Oldvalue){
			if(Newvalue){
				let keys = Math.floor(Newvalue);
				this.Tocurrentlyr(keys); //滚动条跳转时，歌词能立即找到key
			}
		},
		currentlyr(Newvalue,Oldvalue){
			// 歌词自动滚动,第一次拿到的li是之前的，所以有一句话唱完之后再跳转的BUG
			if(Newvalue){
				let height = this.$refs.lyric.$el.offsetHeight;
				let y = document.querySelector('li.active').offsetTop;
				if(y > height/2){
					this.$refs.scrollview.Toscrolling(0, height/2 - y, 500);
				}else{
					this.$refs.scrollview.Toscrolling(0, 0, 500);
				}
			}
			
		}
},	
methods:{
	Tocurrentlyr(index){
			if(index <= 0){
				this.currentlyr = Object.keys(this.getlyric)[0];
				return;
			}
			let keys = index + '';	
			if(this.getlyric[keys] != undefined && this.getlyric[keys] != ''){
				this.currentlyr = Math.floor(index) + '';
				return;
			}else{
				this.Tocurrentlyr(index-1);
			}
		},
},
  props: {
    banners:Array,
	currentime:Number
  }
}


</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable.scss";
.playermiddle{
	width: 100%;
	position: absolute;
	top:150px;
	bottom: 350px;
	right: 0;
	left: 0;
	text-align: center;
	@include font_color();
	@include font_size($font_medium);
	.cover{
		width: 100%;
		display: flex;
		flex-direction: column;/*这里可以不写，flex布局默认方向横向即row*/
		justify-content: center;
		align-items: center;
		.coverimg{
			width: 500px;
			height: 500px;
			box-sizing: border-box;
			border-radius: 50%;
			border: 30px solid rgb(240, 238, 238);
			margin-bottom: 30px;
			overflow: hidden;
			animation:rotate 3s linear infinite;
			animation-play-state: paused;
			position: relative;
			&.active{
				animation-play-state: running;
			}
			img{
				width: 150%;
				height: 150%;
				position: relative;
				top:50%;
				left:50%;
				transform: translate(-50%,-50%);
			}
		}	
	}

	.iyrics{
		width: 100%;
		height: 100%;
		.iyrics_wapper{
			list-style-type: none;
			margin: 0;
			padding-bottom: 50px;
			li{
				margin-bottom: 20px;
				&:last-child{
					padding-bottom: 50px;
				}
				&.active{
					color: white;
				}	
			}
		}	
	}
}

@keyframes rotate{
	from{
		transform: rotate(0deg);
	}
	to{
		transform: rotate(360deg);
	}
}
</style>

<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet{
	display: inline-block;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: white;
	margin-right: 15px;
}
.my-bullet-active{
	width: 60px;
	@include bg_color();
}
</style>