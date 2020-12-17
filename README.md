# Demo
[Demo](http://www.paradeto.com/vue-chinese-chess/#/)

# 启动
## 全客户端
AI 算法写在前端
```
cd client && npm run serve
```

## 使用服务端 AI
AI 算法用 `golang` 实现，通过接口返回给前端走法，请先准备 `golang` 开发环境。

### 启动服务端
```
cd server && go run main.go
```

### 切换 AI
修改 `client/src/chess/Game.ts` 为：
```javascript
  return new Player(
    color,
    type,
    // new Bridge({ depth: (level as number) + 2, board: board as Board, color, aiType: 'minimax', workerPath })
    new ProxyAi()
  )
```
然后在 `client` 目录下启动前端服务：
```
npm run serve
```

# 关注公众号获取更多文章
![image](https://github.com/ParadeTo/chinese-chess/blob/master/wx.png)

