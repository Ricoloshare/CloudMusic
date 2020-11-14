<template>
   <swiper ref="mySwiper" :options="swiperOptions" class="banner" >
    <swiper-slide class="item">
      <a>
        <img src="../../assets/images/banner1.jpg">
      </a>
     </swiper-slide>
     <swiper-slide class="item">
      <a>
        <img src="../../assets/images/banner2.jpeg">
      </a>
     </swiper-slide>  
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>  
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
// import 'swiper/swiper-bundle.css'

export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperSlide,
    // Pagination
  },
	data() {
		return {
			swiperOptions: {
	      loop: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
			}
		}
  },
  props: {
    banners:Array
  }
}
</script>

<style scoped lang="scss">
 @import "../../assets/css/mixin";
.banner{
  .item{
    width: 100%;
    height: 330px;
    // @include bg_sub_color();
    padding:15px;
    box-sizing: border-box;
    img{
      border-radius:15px;
      width: 100%;
      height: 300px;
    }
  }
}
.swiper-pagination-bullet{
  width: 20px;
  height:20px;
}
</style>
<style lang="scss">
 @import "../../assets/css/mixin";
.swiper-pagination-bullet{
  width: 15px;
  height:15px;
}
.swiper-pagination-bullet-active{
  @include bg_color();
}
</style> 