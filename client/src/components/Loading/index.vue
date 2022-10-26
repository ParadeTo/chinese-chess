<template>
  <div id="loadingToast" :class="{ show: isLoading, hide: !isLoading }">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">电脑思考中</p>
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

<style>
.show {
  opacity: 1;
  display: block;
}
.hide {
  opacity: 0;
  display: none;
}
</style>
