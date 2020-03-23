<template>
  <div>
    <GridView :cols="3" :lineSpace="15" :v-margin="20" v-if="categoriesProduct">
      <div class="content-item" v-for="(item, index) in categoriesProduct" :key="index">
        <img v-lazy="item.image" @load="imgLoad"/>
        <div>{{item.title}}</div>
      </div>
    </GridView>
  </div>
</template>

<script>
import GridView from "../../../components/common/grid/GridView";

export default {
  name: "TabContent",
  components: {
    GridView
  },
  props: {
    categoriesProduct: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgLoad(){
      // console.log(1);
      
      this.$bus.$emit('tabCoutentLoad')
    }
  },
};
</script>

<style scoped>
.content-item {
  text-align: center;
  font-size: 12px;
}
.content-item img {
  width: 80%;
}
.content-item span {
  margin-top: 15px;
}
</style>