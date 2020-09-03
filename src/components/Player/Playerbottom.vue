<template>
	<div class="playerbottom">
			<div class="progress">
				<span ref="startime">00:00</span>
				<div class="progress_bar" @click.stop="progressChange" ref="bar">
					<div class="progress-line" ref="line">
						<div class="progress-dot" ref="dot"></div>
					</div>
				</div>
				<span ref="totalshow">00:00</span>
			</div>
			<div class="playericon">
				<div class="mode loop" @click="setMode()" ref="mode"></div>
				<div class="prev" @click="prev()"></div>
				<div class="play" @click="setPlay()" ref="playmode"></div>
				<div class="next" @click="next()"></div>
				<div class="favi"></div>
			</div>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import {mode} from '../../store/mode-type'
export default {
	name: 'Playerbottom',
	props:{
		totaltime:{
			type:Number,
			default: 0
		},
		currentime:{
			type:Number,
			default: 0
		},
	},
	methods:{
		...mapActions([
			  'setPlayMode',
			  'setCurrentMode',
			   'setSongIndex',
			   'setPlayTime'
		]),
		setPlay(){
			this.setPlayMode(!this.getisPlayMode);
		},
		setMode(){
			if(this.getCurrentMode == mode.loop){
				this.setCurrentMode(mode.one);
			}else if(this.getCurrentMode == mode.one){
				this.setCurrentMode(mode.shuffle);
			}else if(this.getCurrentMode == mode.shuffle){
				this.setCurrentMode(mode.loop);
			}
		},
		prev(){
			let length = this.getDetailSong.length;
			if(length > 0){
				if(this.getCurrentIndex>0){
					this.setSongIndex(this.getCurrentIndex - 1)
				}else{
					this.setSongIndex(length - 1)
				}
			}
		},
		next(){
			let length = this.getDetailSong.length;
			if(length > 0){
				if(this.getCurrentIndex<length-1){
					this.setSongIndex(this.getCurrentIndex + 1)
				}else{
					this.setSongIndex(0)
				}
			}
		},
		progressChange(event){
			let x = event.pageX;
			let Width = this.$refs.bar.offsetWidth;
			let leftW = this.$refs.bar.offsetLeft;
			let per = (x - leftW)/Width;

			this.setPlayTime(this.totaltime * per);
		}
	},
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getisPlayMode',
	  'getCurrentMode',
	  'getCurrentIndex',
	  'getDetailSong',
	  'getCurrentime'
      // ... 
	])},
	watch:{
		getisPlayMode(Newvalue,Oldvalue){
			if(Newvalue){
				this.$refs.playmode.classList.add('active');
			}else{
				this.$refs.playmode.classList.remove('active');
			}
		},
		getCurrentMode(newValue,oldValue){
			if(newValue === mode.loop){
				this.$refs.mode.classList.remove('shuffle');
				this.$refs.mode.classList.add('loop');
			}else if(newValue == mode.one){
            	this.$refs.mode.classList.remove('loop');
				this.$refs.mode.classList.add('one');
			}else if(newValue == mode.shuffle){
				this.$refs.mode.classList.remove('one');
				this.$refs.mode.classList.add('shuffle');
			}
		},
		totaltime(newValue,oldValue){
			if(newValue){
				let timer = cacutime(newValue);
				this.$refs.totalshow.innerHTML = timer.mins + ':' +timer.seds;
			}
		},
		currentime(newValue,oldValue){
			if(newValue){
				let timer = cacutime(newValue);
				this.$refs.startime.innerHTML = timer.mins + ':' +timer.seds;
				// 可以优化，降低刷新频率
				let per = Math.floor(newValue/this.totaltime * 100);
				this.$refs.line.style.width = per + "%";
				this.$refs.dot.style.left = per + "%";
			}
		},
	}
}


function cacutime(time){
			let seds = Math.floor(time % 60) + '';
			let mins = Math.floor(time / 60);
			let hours = 0;
			if(mins >= 60){
				hours = Math.floor(mins / 60);
				mins = mins%60;
			}
			seds = seds.padStart(2,'0');
			mins = mins +'';
			mins = mins.padStart(2,'0');
			return {
				'seds': seds,
				'mins': mins,
				'hours': hours
			}
		}

</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable.scss";
.playerbottom{
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;	
	box-sizing: border-box;
	.progress{
		width: 80%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
		margin: 0 auto;
		span{
			@include font_color();
			@include font_size($font_medium_s);
		}
		.progress_bar{
			width: 80%;
			height: 10px;
			background: white;
			border-radius: 5px;
			position: relative;
			margin: 0 30px;
			
			.progress-line{
				width: 0%;
				height: 100%;
				background: rgb(143, 141, 141);
				border-radius: 5px;
				.progress-dot{
					width: 20px;
					height: 20px;
					border-radius: 10px;
					background: white;
					position: absolute;
					top: 50%;
					transform: translate(-50%,-50%);
					left: 0%;
				}
			}
		}
	}
	.playericon{
		width: 80%;
		padding: 50px 50px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		div{
			width: 84px;
			height: 84px;
		}
		.mode{
			&.loop{
				@include bg_img("../../assets/images/loop");
			}
			&.one{
				@include bg_img("../../assets/images/one");
			}
			&.shuffle{
				@include bg_img("../../assets/images/shuffle");
			}
		}
		.prev{
			@include bg_img("../../assets/images/prev");
		}
		.play{
			@include bg_img("../../assets/images/play");
			&.active{
				@include bg_img("../../assets/images/pause");
			}
		}
		.next{
			@include bg_img("../../assets/images/next");
		}
		.favi{
			@include bg_img("../../assets/images/favorite");
		}
	}
}
</style>
