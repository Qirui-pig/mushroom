<template>
  <div v-if="topImg.length > 0">
    <Swiper class="detail-swiper">
      <SwiperItem v-for="(item,index) in topImg" :key="index">
        <img :src="item|Imgfilter" alt />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  props: {
    topImg: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    Imgfilter: function(value) {
      return "http:" + value;
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>