<template>
  <div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      msg: "",
      isShow: false
    };
  },
  methods: {
    show(msg = "测试", delay = 2000) {
      this.isShow = true;
      this.msg = msg;

      setTimeout(() => {
        this.isShow = false;
        this.msg = '';
      }, delay);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  z-index: 999;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>