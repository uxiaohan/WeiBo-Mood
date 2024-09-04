# WeiBo-Mood

实时关注 Ta 的微博，并了解 Ta 动态的情绪心情，通过 Bark 进行通知的，基于 Nodejs 的 微博心情分析 脚本

填写 `config.js` 配置文件 ( AI 注册地址 [点击注册](https://cloud.siliconflow.cn/i/R83F9xkI))

```js
module.exports = {
  //   AI API接口地址
  chatApi: "https://api.siliconflow.cn/v1/chat/completions",
  //   AI 大模型 (可根据文档更换)
  chatModel: "internlm/internlm2_5-7b-chat",
  //   AI Token
  chatToken: "",
  //   微博ID    https://m.weibo.cn/u/1840274303
  WB_UID: "1840274303",
  //   获取最新微博频率 每间隔16分钟更新一次 (Cron 表达式)
  CRON_TIME: "*/16 * * * *",
  //   Bark通知Token 不填写即不通知  https://bark.day.app/
  BARK_TOKEN: "",
  //   PushDeer通知Token 不填写即不通知  https://www.pushdeer.com/
  PUSH_DEER_TOKEN: ""
};
```

### 安装依赖

```bash
npm install
```

### 运行脚本

```bash
npm start
```
