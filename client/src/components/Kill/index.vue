<template>
  <div id="loadingToast" :class="{ show: isLoading, hide: !isLoading }">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast toast">
      <img src="./kill.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class SettingView extends Vue {
  @Prop({ default: false })
  isLoading!: boolean
}
</script>

<style scoped lang="less">
.show {
  opacity: 1;
  display: block;
}
.hide {
  opacity: 0;
  display: none;
}
.toast {
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
