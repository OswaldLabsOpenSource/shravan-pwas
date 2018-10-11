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
@font-face {
  font-family: dyslexic;
  font-weight: regular;
  src: url("https://static.oswaldlabs.com/opendyslexic3-regular-webfont.woff") format("woff"), url("https://static.oswaldlabs.com/opendyslexic3-regular-webfont.woff2") format("woff2");
}
@font-face {
  font-family: dyslexic;
  font-weight: bold;
  src: url("https://static.oswaldlabs.com/opendyslexic3-bold-webfont.woff") format("woff"), url("https://static.oswaldlabs.com/opendyslexic3-bold-webfont.woff2") format("woff2");
}
html {
  &.dark {
    body {
      background-color: #000 !important;
    }
    main ul li:nth-of-type(2n) {
      background-color: #222 !important;
    }
  }
  &.dyslexia {
    * {
      font-family: dyslexic,sans-serif;
    }
    body {
      background-color: yellow !important;
      color: black !important;
    }
    .title {
      font-weight: bold !important;
    }
    main ul li:nth-of-type(2n) {
      background-color: #fbfbc4 !important;
    }
    .source {
      color: rgba(0, 0, 0, 0.5) !important;
      .name {
        color: #000 !important;
      }
    }
    header {
      background-color: #fbfbc4;
    }
  }
}
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

	.article-mode {
    padding: 5vw;
    a {
      color: inherit;
      font-weight: bold;
    }
		img {
			width: calc(100% + 10vw);
			margin: 0 -5vw;
		}
	}
</style>
