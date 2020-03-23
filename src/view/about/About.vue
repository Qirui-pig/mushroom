<template>
  <div class="category">
    <Navbar class="navbar">
      <div slot="center">分类</div>
    </Navbar>
    <div class="content">
      <TabMenu :categories="categories" @itemClick="itemClick"></TabMenu>
      <BScroll class="tab-content" ref="scroll">
        <TabContent :categoriesProduct="categoriesProduct"></TabContent>
      </BScroll>
    </div>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar";
import BScroll from "components/common/scroll/BScroll";

import TabContent from "./Cpn/TabContent";
import TabMenu from "./Cpn/TabMenu";

import { getCategory, getSubCategory } from "../../network/category";

import { debounce } from "common/utils";

export default {
  name: "About",
  created() {
    this.getCategory();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);

    this.$bus.$on("tabCoutentLoad", () => {
      refresh();
    });
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: 1,
      categoriesProduct: []
    };
  },
  components: {
    Navbar,
    TabMenu,
    TabContent,
    BScroll
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        const ret = res.data;
        this.categories = ret.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        this.getSubCategory(0);
      });
    },

    getSubCategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubCategory(maitKey).then(res => {
        this.categoriesProduct = res.data.list;
        this.categoryData[index].subcategories = res.data;
      });
    },
    itemClick(index) {
      // console.log(index);
      this.getSubCategory(index);
    }
  }
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 99;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}
.tab-content {
  height: 100%;
  flex: 1;
}
</style>