<template>
	<transition
  	@enter="enter"
 		@leave="leave"
  	:css="false"
	>
		<div class="miniplayer" ref="miniplayer">
			<div class="miniwrapper">
				<div class="mini-left" @click="PlayerFullpage()">
					<img :src="getsong.picUrl" ref="cdmin">
					<div class="mini-title">
						<h3>{{getsong.name}}</h3>
						<p>{{getsong.ar}}</p>
					</div>
				</div>
				<div class="mini-right">
					<div class="mini-playicon" ref="playmode" @click="setMode()"></div>
					<div class="mini-listicon" @click="showlist()"></div>
				</div>
			</div>	
		</div>
	</transition>
</template>

<script>

import { mapGetters, mapActions} from 'vuex'
export default {
	name: 'MiniPlayer',
	methods:{
		...mapActions([
			'setPlayMode',
			'setPlayList' // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
		]),
		setMode(){
			this.setPlayMode(!this.getisPlayMode);
		},
		showlist(){
			this.setPlayList(true)
		},
		PlayerFullpage(){
			this.$store.dispatch('setFullPlayer',true);
		},
		enter: function (el, done) {
     	Velocity(this.$refs.miniplayer, "transition.shrinkIn", { duration: 500 },{ complete: done })
		},
		leave: function (el, done) {
			Velocity(this.$refs.miniplayer, "transition.shrinkOut", { duration: 500 }, { complete: done })
		}
	},
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  	'getisPlayMode',
		'getsong',
      // ... 
		])
	},
	watch:{
		getisPlayMode(Newvalue,Oldvalue){
			if(Newvalue){
				this.$refs.playmode.classList.add('active');
				this.$refs.cdmin.classList.add('active');
			}else{
				this.$refs.playmode.classList.remove('active');
				this.$refs.cdmin.classList.remove('active');
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable.scss";

.miniplayer{
	width: 100%;
	height: 150px;
	position: absolute;
	bottom: 0;
	left:0px;
	right:0px;
}
.miniwrapper{
	width: 100%;
	height: 100%;
	display:flex;
	justify-content: space-between;
	align-items: center;
	@include bg_color();
	.mini-left{
		display:flex;
		align-items: center;
		img{
			width: 120px;
			height: 120px;
			border-radius: 50%;
			margin: 0 30px;
			box-sizing: border-box;
			border: 5px solid white;
			animation:rotate 3s linear infinite;
			animation-play-state: paused;
			&.active{
				animation-play-state: running;
			}
		}
		.mini-title{
			@include font_color();
			@include font_size($font_medium_s);
			color: white;
			h3{
				@include clamp(1);
				@include font_size($font_medium);
				margin: 0;
			}
			p{
				@include clamp(1);
				margin: 0;
				margin-top: 20px;
			}
		}
	}
	.mini-right{
		display:flex;
		align-items: center;
		.mini-playicon{
			width: 84px;
			height: 84px;
			@include bg_img("../../assets/images/play");
			&.active{
				@include bg_img("../../assets/images/pause");
			}
		}
		.mini-listicon{
			width: 120px;
			height: 120px;
			@include bg_img("../../assets/images/list");
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