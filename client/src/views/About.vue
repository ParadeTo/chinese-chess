<template>
  <div class="about">
    <div class="section">
      <h2>参考资料</h2>
      <li>
        <a href="https://github.com/lihongxun945/myblog/issues/11">五子棋AI教程第二版</a>
      </li>
      <li>
        <a href="https://github.com/geeeeeeeeek/IntelligentChineseChessSystem"
          >IntelligentChineseChessSystem</a
        >
      </li>
    </div>

    <div class="section">
      <h2>版本说明</h2>
      <h3>0.1.0</h3>
      <ul>
        <li>最大最小值搜索算法</li>
        <li>alpha-beta 剪枝</li>
        <li>webworker 并行搜索（仅限一层）</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.section {
  text-align: left;
  padding: 10px;
}
</style>
