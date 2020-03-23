<template>
  <div id="detail">
    <!-- {{this.$route.params.iid}} -->
    <DetailNavBar ref="navbar" @titleClick="titleClick" class="detail-navbar"></DetailNavBar>

    <BScroll :probeType="3" class="content" ref="scroll" @scroll="contentScroll">
      <DetailSwiper :topImg="topImg"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailInfo :detailInfo="detailInfo" @imgLoad="imgLoad"></DetailInfo>
      <DetailParams ref="param" :paramInfo="paramInfo"></DetailParams>
      <DetailComment ref="comment" :commentInfo="commentInfo"></DetailComment>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
      
    </BScroll>
    <DetailBottom @click.native="addToCart"></DetailBottom>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "../../network/detail";

import BScroll from "../../components/common/scroll/BScroll";
import GoodsList from "../../components/content/goods/Goods";

import { debounce } from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";

import DetailNavBar from "./Cpn/DetailNavBar";
import DetailSwiper from "./Cpn/DetailSwiper";
import DetailBaseInfo from "./Cpn/DetailBaseInfo";
import DetailShopInfo from "./Cpn/DetailShopInfo";
import DetailInfo from "./Cpn/DetailInfo";
import DetailParams from "./Cpn/DetailParams";
import DetailComment from "./Cpn/DetailComment";
import DetailBottom from "./Cpn/DetailBottom";

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    BScroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParams,
    DetailComment,
    DetailBottom
  },

  created() {
    this.getDetail();
    this.getRecommend();

    
  },
  mounted() {
    if(this.$refs.param.$el){
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.themeTopYs);
    }, 100)}
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['this.']),

    async getDetail() {
      const { result: ret } = await getDetail(this.$route.params.iid);
      this.topImg = ret.itemInfo.topImages;
      this.goods = new Goods(ret.itemInfo, ret.columns, ret.shopInfo);
      this.shop = new Shop(ret.shopInfo);
      this.detailInfo = ret.detailInfo;
      this.paramInfo = new GoodsParam(ret.itemParams.info, ret.itemParams.rule);

      if (ret.rate.cRate !== 0) {
        this.commentInfo = ret.rate.list[0];
      }
    },
    async getRecommend() {
      const { data: ret } = await getRecommend();
      this.recommends = ret.list;
    },
    titleClick(index) {
      // this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    imgLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    contentScroll(position) {
      const positionY = -position.y;
      // console.log(positionY)

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
      this.listenShowBackTop(position);
    },
    addToCart(){
      const product = {}
      product.image = this.topImg[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.$route.params.iid

      // console.log(product);
      this.$store.dispatch('addCart',product).then(ret=>{
        this.$toast.show(ret,2000)
      })
      // this.addCart(product)
    }
  }
};
</script>

<style socped>
#detail {
  height: 100vh;
  background-color: #fff;
  z-index: 9;
  position: relative;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detail-navbar {
  position: relative;
  z-index: 99;
  background: #fff;
}
</style>