<template>
	<transition
  	@enter="enter"
 		@leave="leave"
  	:css="false"
	>
		<div class="player" ref="normalplayer">
				<div class="player_bg">	
					<img :src="getsong.picUrl" alt="">
					<div class="mask"></div>
				</div>
				<PlayerHeader></PlayerHeader>
				<PlayerMiddle :currentime='currentime'></PlayerMiddle>
				<Playerbottom :totaltime='totaltime' :currentime='currentime'></Playerbottom>
		</div>
	</transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import Playerbottom from './Playerbottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
	name: 'NormalPlayer',
	components:{
		PlayerHeader,
		PlayerMiddle,
		Playerbottom
	},
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getsong',
      // ... 
    ])},
	methods:{
		enter: function (el, done) {
			Velocity(this.$refs.normalplayer, "transition.shrinkIn", { duration: 500 },{ complete: done })
		},
		leave: function (el, done) {
			Velocity(this.$refs.normalplayer, "transition.shrinkOut", { duration: 500 }, { complete: done })
		}
	},
	props:{
		totaltime:{
			type:Number
		},
		currentime:{
			type:Number
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.player{
	position: absolute;
	top:0px;
	bottom: 0px;
	right: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	@include bg_sub_color();
	.player_bg,.mask{
		position: absolute;
		top:0px;
		bottom: 0px;
		right: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	.player_bg{
			.mask{
				background: black;
				opacity: 0.7;
			}
			img{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				height: 100%;
				filter: blur(30px);
		}
	}
}
</style>

