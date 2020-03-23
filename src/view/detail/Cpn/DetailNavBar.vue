<template>
  <div>
    <NavBar>
      <div slot="left" @click="back" class="back">
        <img src="~assets/img/common/back.svg" alt=""/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles":key="item.id"
          class="title-item" @click="titleClick(index)"
          :class="{active:index == currentIndex}"
        >{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components: {
    NavBar
  },
  methods: {
    back(){
      this.$router.back()
    },
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    }
  },
};
</script>

<style scoped>
.title{
    display: flex; 
    color: #fff;
    
}
.title-item{
    flex: 1;
    font-size: 15px;
}
.active{
    color: red;
}
.back img{
    margin-top: 12px;
}
</style>