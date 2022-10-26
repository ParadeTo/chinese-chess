<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    <div class="weui-tabbar">
      <router-link to="/" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon icon">
            <!-- <i class="iconfont xiangqi"></i> -->
            <svg
              class="xiang"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="120"
              height="120"
              viewBox="0 0 120 120"
            >
              <image
                id="象"
                x="19"
                y="14"
                xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABcCAMAAADK+BLZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/FBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAD/NzdJDw//NjZKDw//NTX/NDRMDw//MzNNDw/EERGsEBCmEBBLDw//MjJnDw//MTFODw++ERGzEBCtEBCLEBD/MDDSERGrEBDMERGqEBDLERGUEBCXEBCbEBD/Ly+fEBBbDw+lEBD/Li6vEBDRERHQERHPERH/LS3BEBC1EBDOERF/EBCuEBDQEBDLEBBUDw/OEBBSDw9RDw+BEBB2Dw+ADw+KEBCREBCSEBCYEBCcEBCdEBChEBBVDw/GEBC3EBD/LCzIEBDJEBDKEBDKERHHERG4EBCkEBDFERG2EBD/Kyv/KioAAABQShh7AAAAB3RSTlMAZxpNDVon7j1JnwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmChsBGjBWVzpAAAADuUlEQVRYw63WaWOTMBgHcFI2W2hp3KjFg85O1znsZG7e57yZt9v3/zAmkITcBMrfF4U0/PrwJDA9rzHDYfOcVhmS9GmO+kcZ2Z9Zk72Zw2HfJuOCvsxASB9kIKV/cXMy0KR3cDMzCHo2g6BX0kCF3c3xWAuGG5EktTdGYFgPdBZZwirsZ7oXKYJhXfyG5EgRx+ONyBHK5qInghUqNKIzOeIitrY9OZnowXI87CIicsKDowkXvqttzNAEVum2UBaws2oFJbaFafPwD0YUbrFINo+IVTqDU85DIpw4mlPygcJhJNxGCHnRSqLrrle9nMoR9qooWk187Q75NJl4niQ2kdNdOJ2azHqe6417qlKf6GY5LLjmThVS/NXG3aNbDjIQ68RG0PNmVbjFxUQ5FncCqYjfYXR1ZzTkuB3Iro+iCKM8KKSFSIUbEY7BYzW3IuN4Zo8z6HmzxrDd3gc5b1Ucy7xOTdHwExOUm049mFvCz4Moro11EjF4y32tGDGyimgkakHG+OEx1ojB22gEsqY7rFCoNEAqcQeB8I62yY4dxaub1OIOLhHCeSsyFbJIEoYiaq+DmGqDUXzTe+hYEJvJ1Ji7yFwuSxCmqXuNqS37y6pEeI8MbFQiCxbvs7MewFI8SN3IFYoWicqFSdNqAhIPncSVknroQbXU5AzCIycxU0DxV/ZrcrVX347tpjPBjDV1P1TvA+3UxcIsZgyNUdBQohIraQy3eIGyNpLYDDGI/jLqRAgTGaTm8b5eRIkrES0x11VIRZhkikjM9SMtiT61IiLx1yWZCU1fsKzlQvMSLEn8H4LkhJWdIZEcQfiYjco9KW/+lBfz3OPELBPEM3r0JBMis+v102fqIj3XiLTIKNNFYl8o5MtXRtF7nVlSgWRFhJa+eSuQnJiBzDUimb97X5Plg81EROZl2pl5fv7hY04CsUhPcgAAfzIQt7PV/ERBvAuPGJIA/CqKIuYDoDwmLGT/UPKQgRB+zmuyfLtFuYaU3GqGuEMpCA8EUSFFk7j0AokkIhRFTH6xk6wmgcRDX7/pREwWKEwU4xnj46uKi4slJgsSSp6Rcx0JfJMIQHXV9x9FIYoJPC9spKHOAaBkIYs/4e57q6g3t8pvJBHvz2R9/Ov3n6KB1JnkG0k8Kd/Zf/8VjSQwieq9I/K0KC5JzCLYNokAXNpiIcmjrxGtJrCGF7d9Ae4o6paoqVI0fm3goX8D3+9gAn2N5kdvy99Wl6hsgYJe0eAh3+sUXr26EsRuoPQ0gRp0r/A/PS5/M4aRuNcAAAAASUVORK5CYII="
              />
            </svg>
          </div>
        </span>
        <p class="weui-tabbar__label">Game</p>
      </router-link>
      <router-link to="/setting" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon icon">
            <i class="iconfont icon-setting"></i>
          </div>
        </span>
        <p class="weui-tabbar__label">Setting</p>
      </router-link>

      <!-- <router-link to="/about" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <div alt="" class="weui-tabbar__icon">
            <i class="iconfont icon-about"></i>
          </div>
        </span>
        <p class="weui-tabbar__label">About</p>
      </router-link> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  position: fixed !important;
  width: 100%;
  max-width: 480px;
}
.icon {
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.xiang {
  width: 27px;
  height: 27px;
}
</style>

<style lang="less">
.weui-btn.btn {
  margin: 20px 10px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
</style>
