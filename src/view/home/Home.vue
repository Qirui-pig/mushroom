<template>
  <div id="home">
    <NavBar class="nav-bar">
      <div slot="center">蘑菇街</div>
    </NavBar>

    <TabControl
      :titles="['流行','新款','流行']"
      @tabClick="tabClick"
      class="tab-control"
      ref="tabControl1"
      v-show="isTabFixed"
    ></TabControl>

    <BScroll
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      class="content"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners"></HomeSwiper>
      <Recommend :recommends="recommends"></Recommend>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','流行']" ref="tabControl2" @tabClick="tabClick"></TabControl>
      <Goods :goods="goods[currentType].list" v-if="goods[currentType].list.length>0"></Goods>
    </BScroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import BScroll from "../../components/common/scroll/BScroll";

import TabControl from "../../components/content/tabcontrol/TabControl";
import Goods from "../../components/content/goods/Goods";

import HomeSwiper from "./Cpn/HomeSwiper";
import Recommend from "./Cpn/Recommend";
import FeatureView from "./Cpn/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    BScroll,
    TabControl,
    Goods
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      tabOffsetTop: 0,
      currentType: "pop",
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = this.debounce(this.$refs.scroll.refresh(),1);
    // this.$bus.$on("imgload", () => {
    //   refresh()
    // });
    this.$bus.$on("swiperLoad", () => {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    this.$bus.$off("itemImageLoad", this.itemImgListener);
    this.$bus.$off("swiperLoad", this.itemImgListener);
  },
  methods: {
    contentScroll(position) {
      this.listenShowBackTop(position);

      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(this.isTabFixed );
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: #fff;
}
#home {
  height: 100vh;
  position: relative;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}
</style>