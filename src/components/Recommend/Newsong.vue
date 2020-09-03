<template>
  <div class="newsong">
    <h2 class="newsong-title">{{title}}</h2>
    <div class="newsong-list">
      <div class="item" v-for="value in newsongs" :key="value.id" @click="Player(value.id)">
        <div class="song">
          <img v-lazy="value.picUrl" />
          <div>
            <p>{{value.name}}</p>
            <p>{{value.song.artists[0].name}}</p>
          </div>
        </div>
        <span class="playsongs"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
export default {
  name: "Newsong",
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getDetailSong',
      // ... 
	])},
  props: {
    newsongs: Array,
    title: String,
  },
  methods:{
    ...mapActions([
			'setDetailSong',
			'setFullPlayer',
			'setlyric',
			'setSongUrl',
			'setPlayMode'// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
		]),
		Player(id){
      this.setFullPlayer(true);
      this.setPlayMode(true);
			this.setDetailSong([id]);
			this.setlyric([id]);
			this.setSongUrl(id);	
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
h2 {
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
.newsong-list {
  width: 100%;
}
.item {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  .song {
    width: 80%;
    display: flex;
    justify-content: row;
    // overflow: hidden;
    img {
      height: 200px;
      border-radius: 15px;
      padding: 10px;
      box-sizing: border-box;
    }
    p:nth-child(1) {
      @include font_size($font_medium_s);
      @include font_color();
    }
    p:nth-child(2) {
      @include font_color();
      @include font_size($font_samll);
    }
  }
  .playsongs {
    display: block;
    width: 60px;
    height: 60px;
    @include bg_img("../../assets/images/small_play");
  }
}
</style>
