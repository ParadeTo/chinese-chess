<template>
  <div class="hello">
    <h1>{{$t('settings')}} {{version}}</h1>

    <div class="weui-cells__title">{{$t('settings')}}</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{$t('search deep')}}:</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="deep" :value="deep" @change="setDeep">
            <option v-for="d in deepList" :key="d.value" :value="d.value">{{$t(d.title)}} ({{d.value}}~{{d.value+2}})</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{$t('step spread')}}:</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-switch" type="checkbox" style="float:right" :checked="spread" @input="setSpread">
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{$t('lang')}}:</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="lang" :value="lang" @change="setLang">
            <option value="en">English</option>
            <option value="zh">简体中文</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{$t('show steps')}}:</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-switch" type="checkbox" style="float:right" :checked="showSteps" @input="setShowSteps">
        </div>
      </div>
    </div>
    <div class="weui-footer">
      <p class="weui-footer__links">
        <a href="https://github.com/lihongxun945/gobang" target="_blank" class="weui-footer__link">Github</a>
        <a href="javascript:void(0);" class="weui-footer__link">@lihongxun</a>
      </p>
      <p class="weui-footer__text">Copyright © 2018 </p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import { Action, State, Getter, Mutation, namespace } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

import Board from '@/components/Board.vue'
import Game from '@/chess/Game'
import { IGameState } from '../store/types'

const GameGetter = namespace('game', Getter)
const GameMutation = namespace('game', Mutation)

@Component({
  components: {
    Board
  },
  computed: mapState('game', ['game']),
  methods: {
    ...mapMutations('game', { initGame: 'initGame' })
  }
})
export default class Home extends Vue {
  private game!: Game
  @GameMutation initGame!: () => IGameState
  mounted() {
    this.initGame()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../var.less';

h1 {
  font-size: 28px;
  color: @primary-color;
  text-align: center;
}

.operations {
  .weui-btn {
    margin: 5px;
    height: 46px;
  }
}

.weui-footer {
  margin-top: 32px;
}
</style>
