import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home =()=>import('../view/home/Home.vue')
const ShopCart = ()=>import('../view/shopcart/ShopCart.vue')
const About = ()=>import('../view/about/About.vue')
const Profile = ()=>import('../view/profile/Profile.vue')
const Detail = ()=>import('../view/detail/Detail.vue')

const router = new VueRouter({
  mode:'hash',
  routes:[{
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/about',
    component:About
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
})


export default router