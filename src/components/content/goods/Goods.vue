<template>
  <div class="goods" v-if="goods.length > 0">
    <GoodsItem v-for="(item,index) in goods" :product="item" :key="index"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "Goods",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsItem
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: var(--color-background);
  padding: 2px;
}
</style>