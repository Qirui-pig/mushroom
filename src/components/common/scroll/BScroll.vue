<template>
  <div ref="wrapper">
    <div>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
        scroll:null
    }
  },
  mounted(){
    if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
})

    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    }


    if(this.pullUpLoad){
      this.scroll.on('pullingUp', ()=>{
      this.$emit('pullingUp');
    })
    }

  },
  methods:{
    scrollTo(x, y, time=300){
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
      console.log(1);
      
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0;
    }
  },    
  watch: {
    data() {
      setTimeout(this.refresh, 20)
    }
  }
 }
</script>

<style lang="" scoped>
</style>