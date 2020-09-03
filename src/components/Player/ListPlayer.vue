<template>
	<div class="listplayer" v-show="this.getisListPlay">
			<div class="list-top" >
				<div class="top-left" ref="mode">
					<div class="toplefticon loop" @click="setMode()"></div>
					<p>循环播放</p>	
				</div>
				<div class="top-right">
					<div class="toprighticon"></div>
				</div>
			</div>
			<div class="list-middle">
				<Scrollview ref="scrollview">
					<ul class="list-content" ref="playmode">
						<li class="item" v-for="(value,index) in this.getDetailSong" :key='value.id'>
							<div class="item-left">
								<div class="play" v-if='index===getCurrentIndex'></div>
								<p @click="setPlay(index)" >{{value.name}}-<span>{{value.ar}}</span></p>	
							</div>
							<div class="item-right">
								<div class="favi"></div>
								<div class="del"></div>
							</div>
						</li>
					</ul>
				</Scrollview>
			</div>
			<div class="list-bottom" @click="hidden()">关闭</div>
	</div>
</template>

<script>
import Scrollview from '../Scrollview.vue'
import { mapGetters, mapActions} from 'vuex'
import {mode} from '../../store/mode-type'
export default {
	name: 'ListPlayer',
	components:{
		Scrollview
	},
	data:function(){
		return {
			lastIndex: null
		}
	},
	methods:{
		...mapActions([
			  'setPlayMode',// 将 `this.setPlayMode()` 映射为 `this.$store.dispatch('setPlayMode')`
			  'setPlayList',
			  'setCurrentMode',
			  'setSongIndex',
			  'setSongUrl',
		]),
		setPlay(index){
			this.setPlayMode(true);
			this.setSongIndex(index);
		},
		hidden(){
			this.setPlayList(false)
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

	},
	computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getisPlayMode',
	  'getisListPlay',
	  'getCurrentMode',
	  'getsong',
	  'getDetailSong',
	  'getCurrentIndex'
      // ... 
	])},
	watch:{
		getsong(Newvalue,Oldvalue){
			setTimeout(()=>{
				if(this.lastIndex != null){
					this.$refs.playmode.childNodes[this.lastIndex].classList.remove('active');
				}
				if(Newvalue){
					this.$refs.playmode.childNodes[this.getCurrentIndex].classList.add('active');
					this.lastIndex = this.getCurrentIndex;
				}
			},100)
		},
		getCurrentMode(newValue,oldValue){
			if(newValue === mode.loop){
				this.$refs.mode.childNodes[0].classList.remove('shuffle');
				this.$refs.mode.childNodes[0].classList.add('loop');
				this.$refs.mode.childNodes[1].innerHTML='循环播放';
			}else if(newValue == mode.one){
            	this.$refs.mode.childNodes[0].classList.remove('loop');
				this.$refs.mode.childNodes[0].classList.add('one');
				this.$refs.mode.childNodes[1].innerHTML='单曲循环';
			}else if(newValue == mode.shuffle){
				this.$refs.mode.childNodes[0].classList.remove('one');
				this.$refs.mode.childNodes[0].classList.add('shuffle');
				this.$refs.mode.childNodes[1].innerHTML='随机播放';
			}
		},
		getisListPlay(newValue,oldValue){
			if(newValue){
				this.$refs.scrollview.refresh();
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable.scss";

.listplayer{
	width: 100%;
	position: absolute;
	bottom: 0;
	left:0px;
	right:0px;
	z-index:2;
	@include bg_sub_color();
	.list-top{
		width: 100%;
		height: 100px;
		display:flex;
		align-items: center;
		justify-content: space-between;
		.top-left{
			display:flex;
			align-items: center;
			.toplefticon{
				margin-left: 20px;
				width: 56px;
				height: 56px;
				&.loop{
					@include bg_img("../../assets/images/small_loop");
				}
				&.one{
					@include bg_img("../../assets/images/small_one");
				}
				&.shuffle{
					@include bg_img("../../assets/images/small_shuffle");
				}
			}
			p{
				margin: 0 20px;
				@include font_color();
				@include font_size($font_medium);
			}
		}
		.toprighticon{
			width: 84px;
			height: 84px;
			@include bg_img("../../assets/images/small_del");
		}
	}
	.list-middle{
		width: 100%;
		height: 500px;
		overflow: hidden;
		.list-content{
			list-style-type: none;
			margin: 0;
			padding: 0;
			.item{
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&.active{
					.item-left{
						.play{
							margin-left: 20px;
							width: 56px;
							height: 56px;
							@include bg_img("../../assets/images/small_playlist");
						}
						p{
							@include font_active_color();
						}
					}
				}
				.item-left{
					display:flex;
					align-items: center;	
					p{
						margin: 0 20px;
						@include clamp(1);
						@include font_color();
						@include font_size($font_medium);
						span{
							@include font_size($font_medium_s);	
						}
					}
				}
				.item-right{
					display: flex;
					align-items: center;
					.favi{
						width: 56px;
						height: 56px;
						@include bg_img("../../assets/images/small_favorite");
					}
					.del{
						width: 52px;
						height: 52px;
						margin: 0 20px;
						@include bg_img("../../assets/images/small_close");
					}		
				}
			}
		}
	}
	.list-bottom{
		width: 100%;
		height: 100px;
		@include bg_color();
		text-align: center;
		line-height: 100px;
		color: white;
		@include font_size($font_medium);
	}
}
</style>