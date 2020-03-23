<template>
  <div id="shopcart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottom></CartBottom>
  </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './CartList';
import CartBottom from './CartBottom';


import { mapGetters } from 'vuex';

export default {
  name:'ShopCart',
  components:{
    NavBar,
    CartList,
    CartBottom
  },
  computed: {
    ...mapGetters(['cartList','cartCount'])
  },
}
</script>

<style>
  #shopcart {
    /*position: relative;*/
    height: 100vh;
  }
   .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>