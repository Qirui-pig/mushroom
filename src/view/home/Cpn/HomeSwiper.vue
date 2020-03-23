<template>
  <div v-if="Object.keys(banners).lentgh !== 0">
    <Swiper ref="Swiper" v-if="banners.length">
      <Swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" />
        </a>
      </Swiper-item>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$bus.$emit("swiperLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>