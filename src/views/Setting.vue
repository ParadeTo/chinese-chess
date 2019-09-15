<template>
  <div class="setting">
    <div class="weui-cells">
      <template v-for="(player, i) in tmpPlayers">
        <div :key="i+'r'" class="weui-cell weui-cell_select weui-cell_select-after level1">
          <div class="weui-cell__hd">
            <label for class="weui-label">{{'玩家' + (i+1)}}</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" :value="player.role" @change="e => onChange(i, 'role', e)">
              <option value="a">电脑</option>
              <option value="h">人类</option>
            </select>
          </div>
        </div>
        <div :key="i+'c'" class="weui-cell weui-cell_select weui-cell_select-after level2">
          <div class="weui-cell__hd">
            <label for class="weui-label">颜色</label>
          </div>
          <div class="weui-cell__bd">
            <select
              class="weui-select"
              v-model="player.color"
              @change="e => onChange(i, 'color', e)"
            >
              <option value="r">红</option>
              <option value="b">黑</option>
            </select>
          </div>
        </div>
        <div
          :key="i+'l'"
          class="weui-cell weui-cell_select weui-cell_select-after level2"
          v-if="player.role !== 'h'"
        >
          <div class="weui-cell__hd">
            <label for class="weui-label">等级</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="player.level">
              <option value="1">初级</option>
              <option value="2">中级</option>
              <option value="3">高级</option>
            </select>
          </div>
        </div>
      </template>
    </div>
    <a @click="onSave" href="javascript:;" class="weui-btn weui-btn_block weui-btn_primary btn" :class="{'weui-btn_disabled': !changed}">保存设置</a>
    <Dialog :show="showDialog" content="保存后会丢失当前游戏，确定吗？" @cancel="showDialog = false" @ok="onOk" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { Getter, Mutation, namespace } from 'vuex-class'

import Dialog from '@/components/Dialog/index.vue'

import { deepEq } from '@/utils'

import Setting from '../chess/Game'
import { ISettingState, IPlayer } from '../store/types'
import Event from '../event'
import Player from '../chess/Player'

const SettingMutation = namespace('setting', Mutation)
const SettingGetter = namespace('setting', Getter)

@Component({
  components: {
    Dialog
  },
  computed: {
    ...mapState('setting', ['players', 'tmpPlayers']),
  },
  methods: {
    ...mapMutations('setting', ['savePlayers', 'editPlayers'])
  }
})
export default class SettingView extends Vue {
  @SettingGetter players!: IPlayer[]
  @SettingGetter tmpPlayers!: IPlayer[]
  private showDialog: boolean = false

  @SettingMutation savePlayers!: () => ISettingState
  @SettingMutation editPlayers!: (params: {
    i: number
    field: keyof IPlayer
    value: any
  }) => ISettingState

  get changed() {
    return !deepEq(this.players, this.tmpPlayers)
  }

  onSave() {
    if (!deepEq(this.tmpPlayers, this.players)) {
      this.showDialog = true
    }
  }

  onOk() {
    this.savePlayers()
    this.showDialog = false
  }

  onChange(i: number, field: keyof IPlayer, e: any) {
    this.editPlayers({ i, field, value: e.target.value })
  }
}
</script>

<style scoped lang='less'>
.weui-cells {
  text-align: left;
  &:first-of-type {
    margin-top: 0;
  }
}
.level1 {
  font-size: 16px;
  &::before {
    left: 0;
  }
}
.level2 {
  font-size: 14px;
  .weui-cell__hd {
    padding-left: 10px;
  }
}
</style>
