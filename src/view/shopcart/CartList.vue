<template>
  <div class="cart-list">
    <BScroll class="content" ref="scroll">
      <CartListItem v-for="item in cartList" :key="item.iid" :item-info="item"></CartListItem>
    </BScroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "components/common/scroll/BScroll";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    BScroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList", "cartCount"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart_list {
  height: calc(100% - 44px -49px - 50px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>