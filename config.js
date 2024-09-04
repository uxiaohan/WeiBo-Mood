module.exports = {
  // 注册免费 AI    https://cloud.siliconflow.cn/i/R83F9xkI
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
