<template>
  <div
    v-if="show"
    class="js_dialog"
    id="iosDialog1"
    :style="`opacity: ${show ? 1 : 0}; display: ${show ? 'block' : 'none'}`"
  >
    <div class="weui-mask"></div>
    <div class="weui-dialog">
      <div v-if="title" class="weui-dialog__hd">
        <strong class="weui-dialog__title">{{ title }}</strong>
      </div>
      <div class="weui-dialog__bd">{{ content }}</div>
      <div class="weui-dialog__ft">
        <a
          :if="hasCancel"
          href="javascript:;"
          class="weui-dialog__btn weui-dialog__btn_default"
          @click="onCancel"
          >{{ cancelText }}</a
        >
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="onOk">{{
          okText
        }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class SettingView extends Vue {
  @Prop({ default: '' })
  title!: string

  @Prop({ default: '' })
  content!: string

  @Prop({ default: '确定' })
  okText!: string

  @Prop({ default: '取消' })
  cancelText!: string

  @Prop({ default: false })
  show!: boolean

  @Prop({ default: true })
  hasCancel!: boolean

  onCancel() {
    this.$emit('cancel')
  }

  onOk() {
    this.$emit('ok')
  }
}
</script>
