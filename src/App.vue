<template>
  <div id="app">
    <header v-if="$route.path !== '/'">
      <router-link to="/">
        <font-awesome-icon icon="chevron-left" />
        <span>Back</span>
      </router-link>
    </header>
    <div :class="$route.path !== '/' ? 'view' : ''" v-touch:swipe.right="back">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    
  },
  methods: {
    back() {
      this.$route.path !== "/" && this.$router.push("/");
    }
  }
}
</script>


<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin: 0;
  color: #fff;
  background-color: #270680;
}
header {
  height: 10vh;
  background-color: #231463;
  a {
    color: inherit;
    text-decoration: none;
    height: 10vh;
    width: 100%;
    display: block;
    box-sizing: border-box;
    line-height: 10vh;
    font-size: 4vh;
    padding-left: 3vw;
    span {
      margin-left: 3vh;
    }
  }
}
.view {
  position: absolute;
  left: 0; right: 0;
  top: 10vh; bottom: 0;
  overflow: auto;
}
p {
  margin: 0;
  line-height: 1.5;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
