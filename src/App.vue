<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <div class="weui-tabbar">
      <router-link to="/" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon">
            <i class="iconfont icon-shouye"></i>
          </div>
        </span>
        <p class="weui-tabbar__label">Home</p>
      </router-link>
      <router-link to="/settings" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon">
            <i class="iconfont icon-shezhi"></i>
          </div>
        </span>
        <p class="weui-tabbar__label">Setting</p>
      </router-link>
      <router-link to="/change" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon">
            <i class="iconfont icon-shijian"></i>
          </div>
          <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">1</span>
        </span>
        <p class="weui-tabbar__label">About</p>
      </router-link>
      <router-link to="/about" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon">
            <i class="iconfont icon-xinxi"></i>
          </div>
        </span>
        <p class="weui-tabbar__label">Other</p>
      </router-link>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.weui-tabbar {
  position: fixed!important;
}
</style>
